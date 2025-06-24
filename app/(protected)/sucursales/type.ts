export interface Sucursal {
  id?: string;
  nombre: string;
  direccion: string;
  telefono: string;
  activo?: boolean;
  creado_at?: Date;
  cajas?: Array<{
    id: string;
    nombre: string;
  }>;
}