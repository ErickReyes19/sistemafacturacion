"use server";

import { prisma } from '@/lib/prisma';
import { Almacen } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getAlmacenes(): Promise<Almacen[]> {
  const records = await prisma.almacen.findMany({
    include: {
      sucursal: true,
    },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    sucursalId: r.sucursalId || "",
    sucursal: r.sucursal?.nombre || "",
  }));
}

/**
 * Obtiene todas las categorías activas
 */
export async function getAlmacenesActivos(): Promise<Almacen[]> {
  const records = await prisma.almacen.findMany({
    where: { activo: true },
    include: {
      sucursal: true,
    },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    sucursalId: r.sucursalId || "",
    sucursal: r.sucursal?.nombre || "",
  }));
}

/**
 * Obtiene una categoría por ID
 */
export async function getAlmacenById(id: string): Promise<Almacen | null> {
  const r = await prisma.almacen.findUnique({
    where: { id: id },
    include: {
      sucursal: true,
    },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    sucursalId: r.sucursalId || "",
    sucursal: r.sucursal?.nombre || "",
  };
}

/**
 * Crea una nueva categoría
 */
export async function createAlmacen(data: Almacen): Promise<Almacen> {
  const r = await prisma.almacen.create({
    data: {
      nombre: data.nombre,
      activo: true,
      sucursalId: data.sucursalId,
    },
    include: {
      sucursal: true,
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
    sucursalId: r.sucursalId || "",
    sucursal: r.sucursal?.nombre || "",
  };
}

/**
 * Actualiza una categoría existente
 */
  export async function updateAlmacen(id: string, data: Partial<Almacen>): Promise<Almacen | null> {
    const r = await prisma.almacen.update({
      where: { id: id },
      data: {
      nombre: data.nombre,
      activo: data.activo,
      sucursalId: data.sucursalId,
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}