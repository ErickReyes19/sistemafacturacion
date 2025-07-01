"use server";

import { prisma } from '@/lib/prisma';
import { OrdenCompra, DetalleOrdenCompra } from './type';
import { EstadoOrdenCompra, MovimientoTipo } from '@/app/generated/prisma';
import { getSession } from '@/auth';

function normalizeProveedor(proveedor: any) {
  if (!proveedor) return undefined;
  return {
    ...proveedor,
    email: proveedor.email || '',
    telefono: proveedor.telefono || '',
    direccion: proveedor.direccion || '',
    nombre: proveedor.nombre || '',
    activo: proveedor.activo ?? true,
  };
}

function normalizeEmpleado(empleado: any) {
  if (!empleado) return undefined;
  return {
    ...empleado,
    nombre: empleado.nombre || '',
    apellido: empleado.apellido || '',
    correo: empleado.correo || '',
    numeroIdentificacion: empleado.numeroIdentificacion || '',
    genero: empleado.genero || '',
    activo: empleado.activo ?? true,
    puesto_id: empleado.puesto_id || '',
    puesto: empleado.puesto || '',
  };
}

function normalizeMoneda(moneda: any) {
  if (!moneda) return undefined;
  return {
    ...moneda,
    codigo: moneda.codigo || '',
    nombre: moneda.nombre || '',
    simbolo: moneda.simbolo || '',
    activo: moneda.activo ?? true,
    creado_at: moneda.creado_at || undefined,
  };
}

function normalizeAlmacen(almacen: any) {
  if (!almacen) return undefined;
  return {
    ...almacen,
    nombre: almacen.nombre || '',
    activo: almacen.activo ?? true,
    creado_at: almacen.creado_at || undefined,
    sucursalId: almacen.sucursalId || '',
    sucursal: almacen.sucursal || '',
  };
}

function normalizeDetalle(detalle: any[]): DetalleOrdenCompra[] {
  return detalle?.map((d) => ({
    ...d,
    producto_id: d.producto_id,
    producto_nombre: d.producto?.nombre || '',
    unidad_medida_id: d.unidad_medida_id,
    unidad_medida_nombre: d.unidadMedida?.nombre || '',
    cantidad: d.cantidad,
    precio_unitario: d.precio_unitario,
    subtotal: d.subtotal,
  })) || [];
}

// Obtener todas las órdenes de compra
export async function getOrdenesCompra(): Promise<OrdenCompra[]> {
  const records = await prisma.ordenCompra.findMany({
    include: {
      proveedor: true,
      empleado: true,
      moneda: true,
      almacen: true,
      detalle: true,
      devoluciones: true,
    },
    orderBy: { fecha_orden: 'desc' },
  });
  return records.map((r) => ({
    ...r,
    proveedor: normalizeProveedor(r.proveedor),
    empleado: normalizeEmpleado(r.empleado),
    moneda: normalizeMoneda(r.moneda),
    almacen: normalizeAlmacen(r.almacen),
    detalle: normalizeDetalle(r.detalle),
  }));
}

// Obtener una orden de compra por ID
export async function getOrdenCompraById(id: string): Promise<OrdenCompra | null> {
  const r = await prisma.ordenCompra.findFirst({
    where: { id },
    include: {
      proveedor: true,
      empleado: true,
      moneda: true,
      almacen: true,
      detalle: {
        include: {
          producto: true,
          unidadMedida: true,
        },
      },
      devoluciones: true,
    },
  });
  console.log("🚀 ~ getOrdenCompraById ~ r:", r)
  if (!r) return null;
  return {
    ...r,
    proveedor: normalizeProveedor(r.proveedor),
    empleado: normalizeEmpleado(r.empleado),
    moneda: normalizeMoneda(r.moneda),
    almacen: normalizeAlmacen(r.almacen),
    detalle: normalizeDetalle(r.detalle),
  };
}

// Crear una nueva orden de compra con sus detalles
export async function createOrdenCompra(data: Omit<OrdenCompra, 'id'> & { detalle: DetalleOrdenCompra[] }): Promise<OrdenCompra> {
  const sesion = await getSession()
  const record = await prisma.ordenCompra.create({
    data: {
      proveedor_id: data.proveedor_id,
      empleado_id: sesion!.IdEmpleado ,
      fecha_orden: data.fecha_orden,
      estado: data.estado,
      total: data.total,
      moneda_id: data.moneda_id,
      almacen_id: data.almacen_id,
      detalle: {
        create: data.detalle.map((d) => ({
          producto_id: d.producto_id,
          unidad_medida_id: d.unidad_medida_id,
          cantidad: d.cantidad,
          precio_unitario: d.precio_unitario,
          subtotal: d.subtotal,
        })),
      },
    },
    include: {
      proveedor: true,
      empleado: true,
      moneda: true,
      almacen: true,
      detalle: true,
      devoluciones: true,
    },
  });
  return {
    ...record,
    proveedor: normalizeProveedor(record.proveedor),
    empleado: normalizeEmpleado(record.empleado),
    moneda: normalizeMoneda(record.moneda),
    almacen: normalizeAlmacen(record.almacen),
    detalle: normalizeDetalle(record.detalle),
  };
}

// Actualizar una orden de compra y, si cambia el estado, modificar inventario
export async function updateOrdenCompra(id: string, data: Partial<OrdenCompra> & { detalle?: DetalleOrdenCompra[] }): Promise<OrdenCompra | null> {
  // Obtener la orden original
  const ordenOriginal = await prisma.ordenCompra.findFirst({
    where: { id },
    include: { detalle: true },
  });
  if (!ordenOriginal) return null;

  // Actualizar la orden
  const record = await prisma.ordenCompra.update({
    where: { id },
    data: {
      proveedor_id: data.proveedor_id,
      empleado_id: data.empleado_id,
      fecha_orden: data.fecha_orden,
      estado: data.estado,
      total: data.total,
      moneda_id: data.moneda_id,
      almacen_id: data.almacen_id,
    },
    include: {
      proveedor: true,
      empleado: true,
      moneda: true,
      almacen: true,
      detalle: true,
      devoluciones: true,
    },
  });

  // Si el estado cambió a 'aprobada' o 'recibida', actualizar inventario
  if (
    data.estado &&
    (data.estado === EstadoOrdenCompra.aprobada || data.estado === EstadoOrdenCompra.recibida) &&
    ordenOriginal.estado !== data.estado
  ) {
    // Por cada detalle, sumar la cantidad al inventario del producto en el almacén
    for (const d of record.detalle) {
      // Buscar inventario existente
      const inventario = await prisma.inventario.findFirst({
        where: {
          producto_id: d.producto_id,
          almacen_id: record.almacen_id,
        },
      });
      if (inventario) {
        await prisma.inventario.update({
          where: { id: inventario.id },
          data: { cantidad: { increment: d.cantidad } },
        });
      } else {
        await prisma.inventario.create({
          data: {
            producto_id: d.producto_id,
            almacen_id: record.almacen_id,
            cantidad: d.cantidad,
            minimo_stock: 0,
          },
        });
      }
    }
  }

  // Si se pasan detalles, actualizarlos (borrado y recreación simple)
  if (data.detalle) {
    // Eliminar detalles existentes
    await prisma.detalleOrdenCompra.deleteMany({ where: { orden_compra_id: id } });
    // Crear nuevos detalles
    for (const d of data.detalle) {
      await prisma.detalleOrdenCompra.create({
        data: {
          orden_compra_id: id,
          producto_id: d.producto_id,
          unidad_medida_id: d.unidad_medida_id,
          cantidad: d.cantidad,
          precio_unitario: d.precio_unitario,
          subtotal: d.subtotal,
        },
      });
    }
  }

  // Retornar la orden actualizada
  const updated = await prisma.ordenCompra.findFirst({
    where: { id },
    include: {
      proveedor: true,
      empleado: true,
      moneda: true,
      almacen: true,
      detalle: true,
      devoluciones: true,
    },
  });
  if (!updated) return null;
  return {
    ...updated,
    proveedor: normalizeProveedor(updated.proveedor),
    empleado: normalizeEmpleado(updated.empleado),
    moneda: normalizeMoneda(updated.moneda),
    almacen: normalizeAlmacen(updated.almacen),
    detalle: normalizeDetalle(updated.detalle),
  };
}

export async function updateEstadoYInventario(
  id: string,
  nuevoEstado: EstadoOrdenCompra
): Promise<OrdenCompra | null> {
  return await prisma.$transaction(async (tx) => {
    // 1. Obtener la orden original con detalles
    const ordenOriginal = await tx.ordenCompra.findUnique({
      where: { id },
      include: { detalle: true }
    });
    if (!ordenOriginal) return null;

    // 2. Actualizar sólo el estado
    const ordenActualizada = await tx.ordenCompra.update({
      where: { id },
      data: { estado: nuevoEstado }
    });

    // 3. Definir estados que disparan ajuste de inventario
    const estadosConInventario: EstadoOrdenCompra[] = [
      EstadoOrdenCompra.aprobada,
      EstadoOrdenCompra.recibida
    ];

    // 4. Si el estado cambia a uno que requiere inventario, procesarlo
    if (
      ordenOriginal.estado !== nuevoEstado &&
      estadosConInventario.includes(nuevoEstado)
    ) {
      for (const detalle of ordenOriginal.detalle) {
        // 4.1 Obtener factor de presentación
        const pu = await tx.productoUnidad.findFirst({
          where: {
            producto_id:      detalle.producto_id,
            unidad_medida_id: detalle.unidad_medida_id
          }
        });
        const factor = pu?.factor ?? 1;
        const unidadesReales = detalle.cantidad * factor;

        // 4.2 Ajustar o crear inventario
        let inv = await tx.inventario.findFirst({
          where: {
            producto_id: detalle.producto_id,
            almacen_id:  ordenActualizada.almacen_id
          }
        });

        if (inv) {
          inv = await tx.inventario.update({
            where: { id: inv.id },
            data: { cantidad: { increment: unidadesReales } }
          });
        } else {
          inv = await tx.inventario.create({
            data: {
              producto_id:  detalle.producto_id,
              almacen_id:   ordenActualizada.almacen_id,
              cantidad:     unidadesReales,
              minimo_stock: 0
            }
          });
        }

        // 4.3 Registrar movimiento de inventario con enlace a detalle de la orden
        await tx.movimientoInventario.create({
          data: {
            inventario_id: inv.id,
            tipo:          "ingreso",
            cantidad:      unidadesReales,
            fecha:         new Date(),
            descripcion:   "Entrada por orden de compra",
            referencia:    ordenActualizada.id,
          }
        });
      }
    }

    // 5. Devolver la orden con su estado actualizado
    return ordenActualizada;
  });
}


// Eliminar una orden de compra
export async function deleteOrdenCompra(id: string): Promise<void> {
  await prisma.ordenCompra.delete({ where: { id } });
}

// CRUD para DetalleOrdenCompra (opcional, si necesitas endpoints directos)
export async function getDetalleOrdenCompraById(id: string): Promise<DetalleOrdenCompra | null> {
  return await prisma.detalleOrdenCompra.findFirst({ where: { id } });
}

export async function deleteDetalleOrdenCompra(id: string): Promise<void> {
  await prisma.detalleOrdenCompra.delete({ where: { id } });
}
