"use server";

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { Puesto } from './types';

/**
 * Obtiene todos los puestos
 */
export async function getPuestos(): Promise<Puesto[]> {
  const records = await prisma.puesto.findMany();
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
  }));
}

/**
 * Obtiene solo los puestos activos
 */
export async function getPuestosActivas(): Promise<Puesto[]> {
  const records = await prisma.puesto.findMany({
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
 * Obtiene un puesto por ID
 */
export async function getPuestoById(id: string): Promise<Puesto | null> {
  const r = await prisma.puesto.findUnique({
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
 * Crea un nuevo puesto
 */
export async function createPuesto(data: Puesto): Promise<Puesto> {
  const id = randomUUID();
  const r = await prisma.puesto.create({
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
 * Actualiza un puesto existente
 */
export async function updatePuesto(id: string, data: Partial<Puesto>): Promise<Puesto | null> {
  const r = await prisma.puesto.update({
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
