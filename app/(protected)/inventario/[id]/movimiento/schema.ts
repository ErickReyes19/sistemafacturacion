import { z } from "zod"

export const MovimientoInventarioSchema = z.object({
  inventario_id: z.string().min(1),
  tipo: z.enum(["ingreso", "egreso", "ajuste"]),
  cantidad: z.number().int().min(1, "Debe ser mayor a 0"),
  observaciones: z.string().optional(),
})
