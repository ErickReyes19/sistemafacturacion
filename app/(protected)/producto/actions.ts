"use server";

import { prisma } from '@/lib/prisma';
import { Producto } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getProductos(): Promise<Producto[]> {
  const records = await prisma.producto.findMany({
    include: {
      categoria: true,
      moneda: true,
      impuesto: true,
      unidades: true,
      unidadBase: true,
    },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    sku: r.sku,
    nombre: r.nombre,
    activo: r.activo,
    impuesto_id: r.impuesto_id ?? "",
    impuesto: r.impuesto?.nombre ?? "",
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
    unidad_medida_id: r.unidad_medida_id,
    unidadBase: r.unidadBase?.nombre ?? "",
    categoria_id: r.categoria_id,
    categoria: r.categoria?.nombre ?? "",
    moneda_id: r.moneda_id,
    moneda: r.moneda?.nombre ?? "",
    precio_compra: r.precio_compra,
    precio_venta: r.precio_venta
  }));
}

/**
 * Obtiene todas las categorías activas
 */
export async function getProductosActivos(): Promise<Producto[]> {
  const records = await prisma.producto.findMany({
    where: { activo: true },
    include: {
      unidadBase: true,
      categoria: true,
      moneda: true,
      impuesto: true,
      unidades: true,
    },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    sku: r.sku,
    nombre: r.nombre,
    activo: r.activo,
    impuesto_id: r.impuesto_id ?? "",
    impuesto: r.impuesto?.nombre ?? "",
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
    unidad_medida_id: r.unidad_medida_id,
    unidadBase: r.unidadBase?.nombre ?? "",
    categoria_id: r.categoria_id,
    categoria: r.categoria?.nombre ?? "",
    moneda_id: r.moneda_id,
    moneda: r.moneda?.nombre ?? "",
    precio_compra: r.precio_compra,
    precio_venta: r.precio_venta
  }));
}

/**
 * Obtiene una categoría por ID
 */
export async function getProductoById(id: string): Promise<Producto | null> {
  const r = await prisma.producto.findUnique({
    where: { id: id },
    include: {
      unidadBase: true,
      categoria: true,
      moneda: true,
      impuesto: true,
      unidades: true,
    },
  });
  if (!r) return null;
  return {
    id: r.id,
    sku: r.sku,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
    unidad_medida_id: r.unidad_medida_id,
    unidadBase: r.unidadBase?.nombre ?? "",
    categoria_id: r.categoria_id,
    categoria: r.categoria?.nombre ?? "",
    impuesto_id: r.impuesto_id ?? "",
    impuesto: r.impuesto?.nombre ?? "",
    moneda_id: r.moneda_id,
    precio_compra: r.precio_compra,
    precio_venta: r.precio_venta
  };
}

/**
 * Crea una nueva categoría
 */
export async function createProducto(data: Producto): Promise<Producto> {
  const r = await prisma.producto.create({
    data: {
      nombre: data.nombre,
      activo: true,
      descripcion : data.descripcion,
      unidad_medida_id: data.unidad_medida_id,
      categoria_id: data.categoria_id,
      moneda_id: data.moneda_id,
      impuesto_id: data.impuesto_id,
      precio_compra: data.precio_compra,
      precio_venta: data.precio_venta,
      sku: data.sku,
    },
    include: {
      unidadBase: true,
      categoria: true,
      moneda: true,
      impuesto: true,
      unidades: true,
    },
  });
  return {
    id: r.id,
    sku: r.sku,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
    unidad_medida_id: r.unidad_medida_id,
    categoria_id: r.categoria_id,
    moneda_id: r.moneda_id,
    precio_compra: r.precio_compra,
    precio_venta: r.precio_venta
  };
}

/**
 * Actualiza una categoría existente
 */
export async function updateProducto(id: string, data: Partial<Producto>): Promise<Producto | null> {
  const r = await prisma.producto.update({
    where: { id: id },
    data: {
      nombre: data.nombre,
      activo: data.activo,
      descripcion: data.descripcion,
      unidad_medida_id: data.unidad_medida_id,
      categoria_id: data.categoria_id,
      moneda_id: data.moneda_id,
      impuesto_id: data.impuesto_id,
      precio_compra: data.precio_compra,
      precio_venta: data.precio_venta,
      sku: data.sku,
    },
  });
  return {
    id: r.id,
    sku: r.sku,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
    unidad_medida_id: r.unidad_medida_id,
    categoria_id: r.categoria_id,
    moneda_id: r.moneda_id,
    precio_compra: r.precio_compra,
    precio_venta: r.precio_venta
    };
}
