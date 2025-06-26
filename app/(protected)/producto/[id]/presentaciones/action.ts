"use server";

import { prisma } from '@/lib/prisma';
import { ProductoUnidad } from './type';

/**
 * Obtiene todas las presentaciones de un producto
 */
export async function getPresentacionesByProducto(producto_id: string): Promise<ProductoUnidad[]> {
  const records = await prisma.productoUnidad.findMany({
    where: { producto_id },
    include: {
      unidadMedida: true,
      producto: true,
    },
    orderBy: { factor: 'asc' },
  });
  return records.map(r => ({
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre ?? undefined,
    unidad_medida_id: r.unidad_medida_id,
    unidad_medida: r.unidadMedida?.nombre ?? undefined,
    factor: r.factor,
    activo: r.activo,
  }));
}

export async function getPresentacionById(id: string): Promise<ProductoUnidad | null> {
  console.log("🚀 ~ getPresentacionById ~ id:", id)
  const record = await prisma.productoUnidad.findUnique({
    where: { id },
    include: {
      unidadMedida: true,
      producto: true,
    },
  });
  console.log("🚀 ~ getPresentacionById ~ record:", record)
  
  if (!record) return null;

  return {
    id: record.id,
    producto_id: record.producto_id,
    producto: record.producto?.nombre ?? undefined,
    unidad_medida_id: record.unidad_medida_id,
    unidad_medida: record.unidadMedida?.nombre ?? undefined,
    factor: record.factor,
    activo: record.activo,
  };
}


/**
 * Crea una nueva presentación para un producto
 */
export async function createPresentacion(data: ProductoUnidad): Promise<ProductoUnidad> {
  console.log("🚀 ~ createPresentacion ~ data:", data)
  const r = await prisma.productoUnidad.create({
    data: {
      producto_id: data.producto_id,
      unidad_medida_id: data.unidad_medida_id,
      factor: data.factor,
      activo: data.activo ?? true,
    },
    include: {
      unidadMedida: true,
      producto: true,
    },
  });
  return {
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre ?? undefined,
    unidad_medida_id: r.unidad_medida_id,
    unidad_medida: r.unidadMedida?.nombre ?? undefined,
    factor: r.factor,
    activo: r.activo,
  };
}

/**
 * Actualiza una presentación existente
 */
export async function updatePresentacion(id: string, data: Partial<ProductoUnidad>): Promise<ProductoUnidad | null> {
  const r = await prisma.productoUnidad.update({
    where: { id },
    data: {
      unidad_medida_id: data.unidad_medida_id,
      factor: data.factor,
      activo: data.activo,
    },
    include: {
      unidadMedida: true,
      producto: true,
    },
  });
  return {
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre ?? undefined,
    unidad_medida_id: r.unidad_medida_id,
    unidad_medida: r.unidadMedida?.nombre ?? undefined,
    factor: r.factor,
    activo: r.activo,
  };
}

/**
 * Elimina una presentación
 */
export async function deletePresentacion(id: string): Promise<void> {
  await prisma.productoUnidad.delete({ where: { id } });
}
