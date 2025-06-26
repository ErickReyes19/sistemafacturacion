export type ProductoUnidad = {
    id?: string;
    producto_id: string;
    producto?: string; // Nombre del producto, opcional para facilitar la visualización
    unidad_medida_id: string;
    unidad_medida?: string; // Nombre de la unidad de medida, opcional para facilitar la visualización
    factor: number; // Ej: 6, 12, etc.
    activo?: boolean;
};
