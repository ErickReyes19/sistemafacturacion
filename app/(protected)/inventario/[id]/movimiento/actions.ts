"use server";

import { prisma } from "@/lib/prisma";
import { MovimientoTipo } from "@prisma/client";
import { MovimientoInventario } from "../../type";

type MovimientoInventarioInput = {
  inventario_id: string;
  tipo: MovimientoTipo;
  cantidad: number;
  observaciones?: string;
};

export async function obtenerMovimientosPorInventario(
    inventarioId: string
  ): Promise<MovimientoInventario[]> {
    const records = await prisma.movimientoInventario.findMany({
      where: { inventario_id: inventarioId },
      include: {
        inventario: {
          include: {
            producto: true,
            almacen: true,
          },
        },
      },
      orderBy: {
        fecha: "desc",
      },
    });
  
    return records.map((r) => ({
      id: r.id,
      inventario_id: r.inventario_id,
      tipo: r.tipo,
      producto: r.inventario?.producto?.nombre ?? "",
      cantidad: r.cantidad,
      fecha: r.fecha,
      observaciones: r.descripcion ?? "",
      inventario: {
        id: r.inventario?.id,
        producto_id: r.inventario?.producto_id ?? "",
        producto: r.inventario?.producto?.nombre ?? "hey",
        almacen_id: r.inventario?.almacen_id ?? "",
        almacen: r.inventario?.almacen?.nombre ?? "hey",
        cantidad: r.inventario?.cantidad ?? 0,
        stock_minimo: r.inventario?.minimo_stock ?? 0,
      },
    }));
  }
  

export async function createMovimientoInventario(
  data: MovimientoInventarioInput
): Promise<MovimientoInventario> {
  // Buscar el inventario y validar existencia
  const inventario = await prisma.inventario.findUnique({
    where: { id: data.inventario_id },
    include: {
      producto: true,
      almacen: true,
    },
  });

  if (!inventario) {
    throw new Error("Inventario no encontrado");
  }

  // Calcular nueva cantidad según el tipo de movimiento
  const nuevaCantidad =
  data.tipo === "ingreso"
    ? inventario.cantidad + data.cantidad
    : data.tipo === "egreso"
      ? inventario.cantidad - data.cantidad
      : // ajuste: se asigna directamente la cantidad enviada
        data.cantidad;

if (nuevaCantidad < 0) {
  throw new Error("No puede quedar stock negativo");
}

  // Actualizar la cantidad en Inventario
  await prisma.inventario.update({
    where: { id: data.inventario_id },
    data: { cantidad: nuevaCantidad },
  });

  // Crear el movimiento
  const movimiento = await prisma.movimientoInventario.create({
    data: {
      inventario_id: data.inventario_id,
      tipo: data.tipo,
      cantidad: data.cantidad,
      descripcion: data.observaciones ?? "",
    },
    include: {
      inventario: {
        include: {
          producto: true,
          almacen: true,
        },
      },
    },
  });

  return {
    id: movimiento.id,
    inventario_id: movimiento.inventario_id,
    tipo: movimiento.tipo,
    producto: movimiento.inventario.producto?.nombre ?? "",
    cantidad: movimiento.cantidad,
    fecha: movimiento.fecha,
    observaciones: movimiento.descripcion ?? "",
    inventario: {
      id: movimiento.inventario.id,
      producto_id: movimiento.inventario.producto_id,
      producto: movimiento.inventario.producto?.nombre ?? "",
      almacen_id: movimiento.inventario.almacen_id,
      almacen: movimiento.inventario.almacen?.nombre ?? "",
      cantidad: movimiento.inventario.cantidad,
      stock_minimo: movimiento.inventario.minimo_stock,
    },
  };
}

export async function updateMovimientoInventario(
    id: string,
    data: Partial<MovimientoInventario>
  ): Promise<MovimientoInventario> {
    // Obtener movimiento original
    const movimientoOriginal = await prisma.movimientoInventario.findUnique({
      where: { id },
      include: {
        inventario: {
          include: {
            producto: true,
            almacen: true,
          },
        },
      },
    });
  
    if (!movimientoOriginal) {
      throw new Error("Movimiento no encontrado");
    }
  
    // Si se intenta cambiar cantidad o tipo, ajustar inventario
    let nuevaCantidadInventario = movimientoOriginal.inventario.cantidad;
  
    if (
      data.cantidad !== undefined &&
      data.cantidad !== movimientoOriginal.cantidad
    ) {
      const diferencia =
        movimientoOriginal.tipo === "ingreso"
          ? data.cantidad - movimientoOriginal.cantidad
          : movimientoOriginal.cantidad - data.cantidad;
  
      nuevaCantidadInventario =
        movimientoOriginal.tipo === "ingreso"
          ? nuevaCantidadInventario + diferencia
          : nuevaCantidadInventario - diferencia;
  
      if (nuevaCantidadInventario < 0) {
        throw new Error("No hay suficiente stock para este cambio");
      }
  
      // Actualizar inventario
      await prisma.inventario.update({
        where: { id: movimientoOriginal.inventario_id },
        data: { cantidad: nuevaCantidadInventario },
      });
    }
  
    // Actualizar movimiento
    const movimientoActualizado = await prisma.movimientoInventario.update({
      where: { id },
      data: {
        cantidad: data.cantidad ?? movimientoOriginal.cantidad,
        descripcion: data.observaciones ?? movimientoOriginal.descripcion,
      },
      include: {
        inventario: {
          include: {
            producto: true,
            almacen: true,
          },
        },
      },
    });
  
    return {
      id: movimientoActualizado.id,
      inventario_id: movimientoActualizado.inventario_id,
      tipo: movimientoActualizado.tipo,
      producto: movimientoActualizado.inventario.producto?.nombre ?? "",
      cantidad: movimientoActualizado.cantidad,
      fecha: movimientoActualizado.fecha,
      observaciones: movimientoActualizado.descripcion ?? "",
      inventario: {
        id: movimientoActualizado.inventario.id,
        producto_id: movimientoActualizado.inventario.producto_id,
        producto: movimientoActualizado.inventario.producto?.nombre ?? "",
        almacen_id: movimientoActualizado.inventario.almacen_id,
        almacen: movimientoActualizado.inventario.almacen?.nombre ?? "",
        cantidad: movimientoActualizado.inventario.cantidad,
        stock_minimo: movimientoActualizado.inventario.minimo_stock,
      },
    };
  }
  
