import * as z from 'zod';

export const InventarioSchema = z.object({
  id: z.string().optional(),
  producto_id: z.string().min(1, "El producto es requerido"),
  almacen_id: z.string().min(1, "El almacen es requerido"),
  cantidad: z.number().min(0, "La cantidad debe ser mayor o igual a 0"),
  stock_minimo: z.number().min(0, "El stock mínimo debe ser mayor o igual a 0"),
  almacen: z.string().optional(),
  producto: z.string().optional()
});

export type Inventario = z.infer<typeof InventarioSchema>;