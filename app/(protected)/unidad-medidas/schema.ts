import * as z from 'zod';

export const UnidadMedidaSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string(),
  activo: z.boolean().optional(), 
  creado_at: z.date().optional(),
  actualizado_at: z.date().optional(),
  });

  export type UnidadMedida = z.infer<typeof UnidadMedidaSchema>;
