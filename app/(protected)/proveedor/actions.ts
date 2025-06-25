"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Proveedor } from "./type";

/**
 * Obtiene todos los proveedores
 */
export async function getProveedor(): Promise<Proveedor[]> {
  const records = await prisma.proveedor.findMany();

  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    email: r.email ?? "No disponible",
    telefono: r.telefono ?? "No disponible",
    activo: r.activo ?? true,
    direccion: r.direccion ?? "No disponible",
  }));
}


/**
 * Obtener un proveedor por ID
 */
export async function getProveedorById(id: string): Promise<Proveedor | null> {
  const r = await prisma.proveedor.findUnique({
    where: { id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    email: r.email ?? "",
    telefono: r.telefono ?? "",
    activo: r.activo,
    direccion: r.direccion ?? ""
  };
}

/**
 * Crea un nuevo proveedor
 */
export async function createProveedor(data: Proveedor): Promise<Proveedor> {
  const id = randomUUID()
  const r = await prisma.proveedor.create({
    data: {
      id,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      activo: data.activo ?? true,
      direccion: data.direccion ?? "",

    },
  });
  return getProveedorById(r.id) as Promise<Proveedor>;
}

/**
 * Actualiza un proveedor existente
 */
export async function updateProveedor(
  id: string,
  data: Partial<Proveedor>
): Promise<Proveedor | null> {
  const r = await prisma.proveedor.update({
    where: { id },
    data: {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      activo: data.activo,
      direccion: data.direccion,
      
    },
  });
  return getProveedorById(r.id);
}

