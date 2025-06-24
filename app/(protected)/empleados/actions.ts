"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Empleado } from "./type"; // Asegúrate de que `EmployeeImportDto` contenga todos los campos importados del Excel

/**
 * Obtiene todos los empleados con datos de puesto y jefe
 */
export async function getEmpleados(): Promise<Empleado[]> {
  const records = await prisma.empleado.findMany({
    include: {
      usuario: true,
      puesto: true,
      sucursal: true,
    },
  });

  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo,
    sucursal_id: r.sucursal_id,
    sucursal: r.sucursal ? r.sucursal.nombre : "Sin Sucursal",
    fechaNacimiento: r.fechaNacimiento ?? new Date(0),
    fechaIngreso: r.fechaIngreso ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    usuario: r.usuario?.usuario ?? "Sin Usuario",
    puesto_id: r.puesto_id,puesto: r.puesto.nombre,
  }));
}

/**
 * Empleados sin usuario asignado
 */
export async function getEmpleadosSinUsuario(): Promise<Empleado[]> {
  const records = await prisma.empleado.findMany({
    where: { usuario: null },
    include: { puesto: true, sucursal: true },
  });
  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo,
    fechaNacimiento: r.fechaNacimiento ?? new Date(0),
    fechaIngreso: r.fechaIngreso ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    sucursal_id: r.sucursal_id,
    sucursal: r.sucursal ? r.sucursal.nombre : "Sin Sucursal",
    activo: r.activo,
    usuario: null,
    puesto_id: r.puesto_id,
    puesto: r.puesto.nombre,
  }));
}

/**
 * Obtener un empleado por ID
 */
export async function getEmpleadoById(id: string): Promise<Empleado | null> {
  const r = await prisma.empleado.findUnique({
    where: { id },
    include: {
      puesto: true,
      usuario: true,
      sucursal: true,
    },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo,
    sucursal_id: r.sucursal_id,
    sucursal: r.sucursal ? r.sucursal.nombre : "Sin Sucursal",
    fechaNacimiento: r.fechaNacimiento ?? new Date(0),
    fechaIngreso: r.fechaIngreso ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    usuario: r.usuario?.usuario ?? null,
    puesto_id: r.puesto_id,puesto: r.puesto.nombre,
  };
}

/**
 * Crea un nuevo empleado
 */
export async function createEmpleado(data: Empleado): Promise<Empleado> {
  const id = randomUUID();
  const r = await prisma.empleado.create({
    data: {
      id,
      nombre: data.nombre,
      apellido: data.apellido,
      sucursal_id: data.sucursal_id,
      correo: data.correo,
      fechaNacimiento: data.fechaNacimiento,
      fechaIngreso: data.fechaIngreso,
      numeroIdentificacion: data.numeroIdentificacion,
      telefono: data.telefono,
      genero: data.genero,
      activo: data.activo ?? true,
      puesto_id: data.puesto_id,
    },
  });
  return getEmpleadoById(r.id) as Promise<Empleado>;
}

/**
 * Actualiza un empleado existente
 */
export async function updateEmpleado(
  id: string,
  data: Partial<Empleado>
): Promise<Empleado | null> {
  const r = await prisma.empleado.update({
    where: { id },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      sucursal_id: data.sucursal_id,
      correo: data.correo,
      fechaNacimiento: data.fechaNacimiento,
      fechaIngreso: data.fechaIngreso,
      numeroIdentificacion: data.numeroIdentificacion,
      telefono: data.telefono,
      genero: data.genero,
      activo: data.activo,
      puesto_id: data.puesto_id,
    },
  });
  return getEmpleadoById(r.id);
}

/**
 * Acción para importar puestos y empleados desde un array de datos del Excel.
 * Si el puesto ya existe, solo devuelve su id; si no, crea uno nuevo.
 * Para cada fila, crea el empleado mapeando todos los campos necesarios.
 */

