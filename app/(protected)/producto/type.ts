import { UnidadMedida } from "../unidad-medidas/types";

export type Producto = {
    id?: string;
    sku: string;
    nombre: string;
    descripcion?: string;
    precio_compra: number;
    precio_venta: number;
    unidad_medida_id: string;
    unidadBase?: string;
    categoria_id: string;
    categoria?: string;
    moneda_id: string;
    moneda?: string;
    impuesto_id?: string;
    impuesto?: string;
    activo?: boolean;
    creado_at?: Date;
    actualizado_at?: Date;
}

