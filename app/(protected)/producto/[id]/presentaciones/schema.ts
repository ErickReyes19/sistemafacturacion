import * as z from "zod";

export const ProductoUnidadSchema = z.object({
    id: z.string().optional(),
    producto_id: z.string().min(1, "El producto es requerido"),
    producto: z.string().optional(), // Nombre del producto, opcional para facilitar la visualización
    unidad_medida_id: z.string().min(1, "La unidad de medida es requerida"),
    unidad_medida: z.string().optional(), // Nombre de la unidad de medida, opcional para facilitar la visualización
    factor: z.number().min(1, "El factor debe ser mayor a 0"),
    activo: z.boolean().optional(),
});

export type ProductoUnidad = z.infer<typeof ProductoUnidadSchema>;
