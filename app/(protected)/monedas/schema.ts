import * as z from 'zod';

export const MonedaSchema = z.object({
  id: z.string().optional(),
  codigo: z.string().min(1, "El codigo es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  simbolo: z.string().optional(),
  activo: z.boolean().optional(),
  creado_at: z.date().optional(),
});

export type Moneda = z.infer<typeof MonedaSchema>;