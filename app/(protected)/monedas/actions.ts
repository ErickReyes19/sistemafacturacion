"use server";

import { prisma } from '@/lib/prisma';
import { Moneda } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getMonedas(): Promise<Moneda[]> {
  const records = await prisma.moneda.findMany({
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    simbolo: r.simbolo || "",
    activo: r.activo,
    creado_at: r.creado_at,
  }));
}

/**
 * Obtiene todas las categorías activas
 */
export async function getMonedasActivas(): Promise<Moneda[]> {
  const records = await prisma.moneda.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  }));
}

/**
 * Obtiene una categoría por ID
 */
export async function getMonedaById(id: string): Promise<Moneda | null> {
  const r = await prisma.moneda.findUnique({
    where: { id: id },
  });
  if (!r) return null;
  return {
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    activo: r.activo,
    simbolo: r.simbolo || "",
    creado_at: r.creado_at
  };
}

/**
 * Crea una nueva categoría
 */
export async function createMoneda(data: Moneda): Promise<Moneda> {
  const r = await prisma.moneda.create({
    data: {
      codigo: data.codigo,
      nombre: data.nombre,
      simbolo: data.simbolo,
      activo: true
    },
  });
  return {
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}

/**
 * Actualiza una categoría existente
 */
  export async function updateMoneda(id: string, data: Partial<Moneda>): Promise<Moneda | null> {
    console.log("🚀 ~ updateMoneda ~ data:", data)
    const r = await prisma.moneda.update({
    where: { id: id },
    data: {
      nombre: data.nombre,
      simbolo: data.simbolo,
      activo: data.activo,
      codigo: data.codigo
    },
  });
  return {
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    activo: r.activo,
    creado_at: r.creado_at,
  };
}