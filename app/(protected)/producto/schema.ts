import * as z from 'zod';

export const ProductoSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(1, "El SKU es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  activo: z.boolean().optional(),
  creado_at: z.date().optional(),
  actualizado_at: z.date().optional(),
  unidad_medida_id: z.string().min(1, "La unidad de medida es requerida"),
  categoria_id: z.string().min(1, "La categoría es requerida"),
  moneda_id: z.string().min(1, "La moneda es requerida"),
  impuesto_id: z.string().optional(),
  precio_compra: z.number().min(0, "El precio de compra debe ser mayor a 0"),
  precio_venta: z.number().min(0, "El precio de venta debe ser mayor a 0"),
  unidadBase: z.string().optional(),
  categoria: z.string().optional(),
  moneda: z.string().optional(),
  impuesto: z.string().optional(),
  
});

export type Producto = z.infer<typeof ProductoSchema>;