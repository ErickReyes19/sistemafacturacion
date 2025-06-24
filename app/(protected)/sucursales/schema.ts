import * as z from 'zod';

export const SucursalSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  activo: z.boolean().optional(),
  cajas: z.array(z.object({
    id: z.string(),
    nombre: z.string(),
  })).optional(),
  creado_at: z.date().optional(),
});

export type Sucursal = z.infer<typeof SucursalSchema>;