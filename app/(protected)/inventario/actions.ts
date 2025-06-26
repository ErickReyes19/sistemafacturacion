"use server";

import { prisma } from '@/lib/prisma';
import { Inventario } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getInventarios(): Promise<Inventario[]> {
  const records = await prisma.inventario.findMany({
    include: {
      almacen: true,
      producto: true,

    },
  });
  return records.map(r => ({
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre || "",
    almacen_id: r.almacen_id,
    almacen: r.almacen?.nombre || "",
    cantidad: r.cantidad,
    stock_minimo: r.minimo_stock,
  }));
}


/**
 * Obtiene una categoría por ID
 */
export async function getInventarioById(id: string): Promise<Inventario | null> {
  console.log("🚀 ~ getInventarioById ~ id:", id)
  const r = await prisma.inventario.findFirst({
    where: { id: id },
    include: {
      almacen: true,
      producto: true,
    },
  });
  if (!r) return null;
  return {
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre || "",
    almacen_id: r.almacen_id,
    almacen: r.almacen?.nombre || "",
    cantidad: r.cantidad,
    stock_minimo: r.minimo_stock,
  };
}

/**
 * Crea una nueva categoría
 */
export async function createInventario(data: Inventario): Promise<Inventario> {
  const r = await prisma.inventario.create({
    data: {
      producto_id: data.producto_id,
      almacen_id: data.almacen_id,
      cantidad: data.cantidad,
      minimo_stock: data.stock_minimo,

    },
    include: {
      almacen: true,
      producto: true,
    },
  });
  return {
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre || "",
    almacen_id: r.almacen_id,
    almacen: r.almacen?.nombre || "",
    cantidad: r.cantidad,
    stock_minimo: r.minimo_stock,
  };
}

/**
 * Actualiza una categoría existente
 */
export async function updateInventario(id: string, data: Partial<Inventario>): Promise<Inventario | null> {
  const r = await prisma.inventario.update({
    where: { id: id },
    data: {
      producto_id: data.producto_id,
      almacen_id: data.almacen_id,
      cantidad: data.cantidad,
      minimo_stock: data.stock_minimo,
    },
    include: {
      almacen: true,
      producto: true,
    },
  });
  return {
    id: r.id,
    producto_id: r.producto_id,
    producto: r.producto?.nombre || "",
    almacen_id: r.almacen_id,
    almacen: r.almacen?.nombre || "",
    cantidad: r.cantidad,
    stock_minimo: r.minimo_stock,
  };
}