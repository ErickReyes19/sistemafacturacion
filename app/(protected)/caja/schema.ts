import * as z from 'zod';

export const CajaSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  activo: z.boolean().optional(),
  creado_at: z.date().optional(),
});

export type Caja = z.infer<typeof CajaSchema>;