"use server";

import { getSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Employee } from "./type"; // Asegúrate que este tipo tenga los campos que se muestran abajo

/**
 * Obtiene el perfil del empleado autenticado.
 */
export async function getProfile(): Promise<Employee | null> {
  const session = await getSession();
  const idEmpleado = session?.IdEmpleado;
  if (!idEmpleado) {
    console.error("Empleado no autenticado");
    return null;
  }

  // 2️⃣ Buscar en la BD el empleado con sus relaciones
  const e = await prisma.empleado.findFirst({
    where: { id: idEmpleado },
    include: {
      usuario: true,
      puesto: true,
      sucursal: true,
    },
  });

  if (!e) {
    console.error("Empleado no encontrado");
    return null;
  }

  // 3️⃣ Mapear al tipo Employee que espera el frontend
  return {
    id: e.id,
    fechaIngreso: e.fechaIngreso ?? new Date(0), // Asegúrate de que 'fechaIngreso' tenga un valor por defecto
    numeroIdentificacion: e.numeroIdentificacion || "No especificado", // Asegúrate de que 'numeroIdentificacion' tenga un valor por defecto
    nombre: e.nombre,
    apellido: e.apellido,
    correo: e.correo,
    usuario: e.usuario?.usuario || "No especificado", // Asegúrate de que 'usuario' tenga un valor por defecto
    fechaNacimiento: e.fechaNacimiento ?? new Date(0),
    genero: e.genero || "No especificado", // Asegúrate de que 'genero' tenga un valor por defecto
    activo: e.activo,
    puesto_id: e.puesto_id,
    telefono: e.telefono || "No especificado", // Asegúrate de que 'telefono' tenga un valor por defecto
    createAt: e.creado_at ?? new Date(0), // Asegúrate de que 'createAt' tenga un valor por defecto
    updateAt: e.actualizado_at ?? new Date(0), // Asegúrate de que 'updateAt' tenga un valor por defecto
    usuario_id: e.usuario?.id ?? "", // Ajusta según el campo real de usuario_id
    sucursal_id: e.sucursal_id || "No especificado", // Asegúrate de que 'sucursal_id' tenga un valor por defecto
    sucursal: e.sucursal?.nombre || "No especificado", // Asegúrate de que 'sucursal' tenga un valor por defecto
  };
}
