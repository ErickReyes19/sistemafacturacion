import type { Proveedor } from "../proveedor/type";
import type { Empleado } from "../empleados/type";
import type { Moneda } from "../monedas/type";
import type { Almacen } from "../almacen/type";
import type { Producto } from "../producto/type";
import type { UnidadMedida } from "../unidad-medidas/types";
import { EstadoOrdenCompra } from "@/app/generated/prisma";


export type DetalleOrdenCompra = {
  id?: string;
  orden_compra_id?: string;
  producto_id: string;
  unidad_medida_id: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  producto?: Producto;
  unidadMedida?: UnidadMedida;
};

export type OrdenCompra = {
  id?: string;
  proveedor_id: string;
  empleado_id?: string;
  fecha_orden: Date;
  estado: EstadoOrdenCompra;
  total: number;
  moneda_id: string;
  almacen_id: string;
  proveedor?: Proveedor;
  empleado?: Empleado;
  moneda?: Moneda;
  almacen?: Almacen;
  detalle?: DetalleOrdenCompra[];
  devoluciones?: any[]; // Ajustar si existe un type DevolucionCompra
  numero?: string;
  fecha?: Date;
};
