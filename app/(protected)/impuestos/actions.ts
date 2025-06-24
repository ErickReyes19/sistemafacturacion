"use server";

import { prisma } from '@/lib/prisma';
import { Impuesto } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getImpuestos(): Promise<Impuesto[]> {
  const records = await prisma.impuesto.findMany({
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    porcentaje: r.porcentaje,
    activo: r.activo,
    creado_at: r.creado_at,
  }));
}

/**
 * Obtiene todas las categorías activas
 */
export async function getImpuestosActivos(): Promise<Impuesto[]> {
  const records = await prisma.impuesto.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    porcentaje: r.porcentaje,
    activo: r.activo,
    creado_at: r.creado_at,
  }));
}

/**
 * Obtiene una categoría por ID
 */
export async function getImpuestoById(id: string): Promise<Impuesto | null> {
  const r = await prisma.impuesto.findUnique({
    where: { id: id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    porcentaje: r.porcentaje,
    activo: r.activo,
    creado_at: r.creado_at
  };
}

/**
 * Crea una nueva categoría
 */
    export async function createImpuesto(data: Impuesto): Promise<Impuesto> {
  const r = await prisma.impuesto.create({
    data: {
      nombre: data.nombre,
      porcentaje: data.porcentaje,
      activo: true
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    porcentaje: r.porcentaje,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}

/**
 * Actualiza una categoría existente
 */
  export async function updateImpuesto(id: string, data: Partial<Impuesto>): Promise<Impuesto | null> {
    const r = await prisma.impuesto.update({
    where: { id: id },
    data: {
      nombre: data.nombre,
      porcentaje: data.porcentaje,
      activo: data.activo,
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    porcentaje: r.porcentaje,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}