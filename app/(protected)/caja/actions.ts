"use server";

import { prisma } from '@/lib/prisma';
import { Caja } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getCajas(): Promise<Caja[]> {
  const records = await prisma.caja.findMany({
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  }));
}

/**
 * Obtiene todas las categorías activas
 */
export async function getCajasActivas(): Promise<Caja[]> {
  const records = await prisma.caja.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  }));
}

/**
 * Obtiene una categoría por ID
 */
export async function getCajaById(id: string): Promise<Caja | null> {
  const r = await prisma.caja.findUnique({
    where: { id: id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}

/**
 * Crea una nueva categoría
 */
export async function createCaja(data: Caja): Promise<Caja> {
  const r = await prisma.caja.create({
    data: {
      nombre: data.nombre,
      activo: true
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}

/**
 * Actualiza una categoría existente
 */
  export async function updateCaja(id: string, data: Partial<Caja>): Promise<Caja | null> {
    const r = await prisma.caja.update({
      where: { id: id },
      data: {
      nombre: data.nombre,
      activo: data.activo
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}