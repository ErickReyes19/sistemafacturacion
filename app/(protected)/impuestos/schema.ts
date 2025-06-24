import * as z from 'zod';

export const ImpuestoSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  porcentaje: z.number().min(0, "El porcentaje es requerido"),
  activo: z.boolean().optional(),
  creado_at: z.date().optional(),
});

export type Impuesto = z.infer<typeof ImpuestoSchema>;