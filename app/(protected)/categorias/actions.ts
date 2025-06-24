"use server";

import { prisma } from '@/lib/prisma';
import { Categoria } from './type';

/**
 * Obtiene todas las categorías
 */
export async function getCategorias(): Promise<Categoria[]> {
  const records = await prisma.categoria.findMany({
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    descripcion: r.descripcion || "",
    activo: r.activo,
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
  }));
}

/**
 * Obtiene todas las categorías activas
 */
export async function getCategoriasActivas(): Promise<Categoria[]> {
  const records = await prisma.categoria.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    descripcion: r.descripcion || "",
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
  }));
}

/**
 * Obtiene una categoría por ID
 */
export async function getCategoriaById(id: string): Promise<Categoria | null> {
  const r = await prisma.categoria.findUnique({
    where: { id: id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    descripcion: r.descripcion || "",
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
  };
}

/**
 * Crea una nueva categoría
 */
export async function createCategoria(data: Categoria): Promise<Categoria> {
  const r = await prisma.categoria.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      activo: true
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    descripcion: r.descripcion || "",
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
  };
}

/**
 * Actualiza una categoría existente
 */
export async function updateCategoria(id: string, data: Partial<Categoria>): Promise<Categoria | null> {
  const r = await prisma.categoria.update({
    where: { id: id },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      activo: data.activo
    },
  });
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    descripcion: r.descripcion || "",
    creado_at: r.creado_at,
    actualizado_at: r.actualizado_at,
  };
}