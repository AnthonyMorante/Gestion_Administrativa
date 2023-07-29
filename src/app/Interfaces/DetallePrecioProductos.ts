import { Productos } from "./Productos";

export interface DetallePrecioProductos {
    idDetallePrecioProducto: string;
    totalIva?: number | null;
    porcentaje?: number | null;
    total?: number | null;
    idProducto?: string | null;
    fechaRegistro?: Date | null;
    activo?: boolean | null;
    idProductoNavigation?: Productos | null;
  } 