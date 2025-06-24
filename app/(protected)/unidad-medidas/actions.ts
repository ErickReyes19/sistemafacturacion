"use server";

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { UnidadMedida } from './types';

/**
 * Obtiene todos las unidades de medida
 */
export async function getUnidadMedidas(): Promise<UnidadMedida[]> {
  const records = await prisma.unidadMedida.findMany();
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
  }));
}

/**
 * Obtiene solo las unidades de medida activas
 */
export async function getUnidadMedidasActivas(): Promise<UnidadMedida[]> {
  const records = await prisma.unidadMedida.findMany({
    where: { activo: true },
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
  }));
}

/**
    * Obtiene una unidad de medida por ID
 */
export async function getUnidadMedidaById(id: string): Promise<UnidadMedida | null> {
  const r = await prisma.unidadMedida.findUnique({
    where: { id: id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
  };
}

/**
 * Crea una nueva unidad de medida
 */
export async function createUnidadMedida(data: UnidadMedida): Promise<UnidadMedida> {
  const id = randomUUID();
  const r = await prisma.unidadMedida.create({
    data: {
      id: id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      activo: data.activo ?? true,
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
  };
}

/**
    * Actualiza una unidad de medida existente
 */
export async function updateUnidadMedida(id: string, data: Partial<UnidadMedida>): Promise<UnidadMedida | null> {
  const r = await prisma.unidadMedida.update({
    where: { id: id },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      activo: data.activo,
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
  };
}
