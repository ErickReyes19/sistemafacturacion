import * as z from 'zod';

export const AlmacenSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  activo: z.boolean().optional(),
  creado_at: z.date().optional(),
  sucursalId: z.string().optional(),
  sucursal: z.string().optional(),
});

export type Almacen = z.infer<typeof AlmacenSchema>;