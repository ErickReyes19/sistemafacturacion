import { MovimientoTipo } from "@/app/generated/prisma";

export type Inventario = {
  id?: string;
  producto_id: string;
  producto?: string;
  almacen_id: string;
  almacen?: string;
  cantidad: number;
  stock_minimo: number;
}



export type MovimientoInventario = {
  id?: string;
  inventario_id: string;
  tipo: MovimientoTipo;
  producto?: string;
  cantidad: number;
  referencia?: string;
  fecha: Date;
  observaciones?: string;
  inventario?: Inventario; // Relación opcional con Inventario
}

