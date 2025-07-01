import * as z from "zod";
import { ProveedorSchema } from "../proveedor/schema";
import { EmpleadoSchema } from "../empleados/schema";
import { MonedaSchema } from "../monedas/schema";
import { AlmacenSchema } from "../almacen/schema";
import { ProductoSchema } from "../producto/schema";
import { UnidadMedidaSchema } from "../unidad-medidas/schema";
import { EstadoOrdenCompra } from "@/app/generated/prisma";

export const DetalleOrdenCompraSchema = z.object({
  id: z.string().optional(),
  orden_compra_id: z.string().optional(),
  producto_id: z.string().uuid(),
  unidad_medida_id: z.string().uuid(),
  cantidad: z.number().int().min(1, "Cantidad mínima 1"),
  precio_unitario: z.number().min(0, "El precio unitario debe ser mayor o igual a 0"),
  subtotal: z.number().min(0, "El subtotal debe ser mayor o igual a 0"),
  producto: ProductoSchema.optional(),
  unidadMedida: UnidadMedidaSchema.optional(),
});

export const OrdenCompraSchema = z.object({
  id: z.string().uuid().optional(),
  proveedor_id: z.string().uuid(),
  empleado_id: z.string().optional(),
  fecha_orden: z.date(),
  estado: z.nativeEnum(EstadoOrdenCompra),
  total: z.number().min(0, "El total debe ser mayor o igual a 0"),
  moneda_id: z.string().uuid(),
  almacen_id: z.string().uuid(),
  proveedor: ProveedorSchema.optional(),
  empleado: EmpleadoSchema.optional(),
  moneda: MonedaSchema.optional(),
  almacen: AlmacenSchema.optional(),
  detalle: z.array(DetalleOrdenCompraSchema).optional(),
  devoluciones: z.array(z.any()).optional(), // Ajustar si existe un schema para DevolucionCompra
});

export type DetalleOrdenCompra = z.infer<typeof DetalleOrdenCompraSchema>;
export type OrdenCompra = z.infer<typeof OrdenCompraSchema>;
