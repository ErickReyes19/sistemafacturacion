
export type Inventario = {
  id?: string;
  producto_id: string;
  producto?: string;
  almacen_id: string;
  almacen?: string;
  cantidad: number;
  stock_minimo: number;
}

