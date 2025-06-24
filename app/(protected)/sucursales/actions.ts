"use server";

import { prisma } from '@/lib/prisma';
import { Sucursal } from './type';
import { randomUUID } from 'crypto';

/**
 * Obtiene todas las sucursales
 */
export async function getSucursales(): Promise<Sucursal[]> {
  const records = await prisma.sucursal.findMany({
    include: {
      cajas: {
        include: {
          caja: true,
        },
      },
    },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    direccion: r.direccion || "",
    telefono: r.telefono || "",
    activo: r.activo,
    creado_at: r.creado_at,
    cajas: r.cajas.map(c => ({
      id: c.caja.id,
      nombre: c.caja.nombre,
    })),
  }));
}

/**
 * Obtiene todas las sucursales activas
 */
export async function getSucursalesActivas(): Promise<Sucursal[]> {
  const records = await prisma.sucursal.findMany({
    where: { activo: true },
    include: {
      cajas: {
        include: {
          caja: true,
        },
      },
    },
    orderBy: { nombre: 'asc' }
  });
  return records.map(r => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    direccion: r.direccion || "",
    telefono: r.telefono || "",
    creado_at: r.creado_at,
    cajas: r.cajas.map(c => ({
      id: c.caja.id,
      nombre: c.caja.nombre,
    })),
  }));
}

/**
 * Obtiene una sucursal por ID
 */
export async function getSucursalById(id: string): Promise<Sucursal | null> {
  const r = await prisma.sucursal.findUnique({
    where: { id: id },
    include: {
      cajas: {
        include: {
          caja: true,
        },
      },
    },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    direccion: r.direccion || "",
    telefono: r.telefono || "",
    creado_at: r.creado_at,
    cajas: r.cajas.map(c => ({
      id: c.caja.id,
      nombre: c.caja.nombre,
    })),
  };
}

/**
 * Crea una nueva sucursal
 */
export async function createSucursal(data: { sucursal: Omit<Sucursal, 'id' | 'creado_at'>; cajasSucursal: string[] }): Promise<Sucursal> {
  // Primero creamos la sucursal sin las cajas
  const sucursalId = randomUUID();
  const r = await prisma.sucursal.create({
    data: {
      id: sucursalId,
      nombre: data.sucursal.nombre,
      direccion: data.sucursal.direccion,
      telefono: data.sucursal.telefono,
      activo: data.sucursal.activo ?? true,
    },
  });

  // Luego creamos las relaciones con las cajas si hay alguna
  if (data.cajasSucursal.length > 0) {
    await prisma.cajaSucursal.createMany({
      data: data.cajasSucursal.map((cajaId: string) => ({
        caja_id: cajaId,
        sucursal_id: sucursalId,
      })),
    });
  }

  // Finalmente obtenemos la sucursal con sus cajas
  const sucursalCompleta = await prisma.sucursal.findUnique({
    where: { id: sucursalId },
    include: {
      cajas: {
        include: {
          caja: true,
        },
      },
    },
  });

  if (!sucursalCompleta) {
    throw new Error("Error al crear la sucursal");
  }
  
  return {
    id: sucursalCompleta.id,
    nombre: sucursalCompleta.nombre,
    activo: sucursalCompleta.activo,
    direccion: sucursalCompleta.direccion || "",
    telefono: sucursalCompleta.telefono || "",
    creado_at: sucursalCompleta.creado_at,
    cajas: sucursalCompleta.cajas.map(c => ({
      id: c.caja.id,
      nombre: c.caja.nombre,
    })),
  };
}

/**
 * Actualiza una sucursal existente
 */
export async function updateSucursal(id: string, data: { sucursal: Partial<Sucursal>; cajasSucursal: string[] }): Promise<Sucursal | null> {
  // Primero actualizamos la sucursal
  const r = await prisma.sucursal.update({
    where: { id: id },
    data: {
      nombre: data.sucursal.nombre,
      direccion: data.sucursal.direccion,
      telefono: data.sucursal.telefono,
      activo: data.sucursal.activo,
    },
  });

  // Luego eliminamos todas las relaciones existentes
  await prisma.cajaSucursal.deleteMany({
    where: { sucursal_id: id },
  });

  // Finalmente creamos las nuevas relaciones si hay alguna
  if (data.cajasSucursal.length > 0) {
    await prisma.cajaSucursal.createMany({
      data: data.cajasSucursal.map((cajaId: string) => ({
        caja_id: cajaId,
        sucursal_id: id,
      })),
    });
  }

  // Obtenemos la sucursal actualizada con sus cajas
  const sucursalActualizada = await prisma.sucursal.findUnique({
    where: { id: id },
    include: {
      cajas: {
        include: {
          caja: true,
        },
      },
    },
  });

  if (!sucursalActualizada) {
    return null;
  }
  
  return {
    id: sucursalActualizada.id,
    nombre: sucursalActualizada.nombre,
    activo: sucursalActualizada.activo,
    direccion: sucursalActualizada.direccion || "",
    telefono: sucursalActualizada.telefono || "",
    creado_at: sucursalActualizada.creado_at,
    cajas: sucursalActualizada.cajas.map(c => ({
      id: c.caja.id,
      nombre: c.caja.nombre,
    })),
  };
}