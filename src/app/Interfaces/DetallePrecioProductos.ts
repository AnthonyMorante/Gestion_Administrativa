import { Ivas } from "./Ivas";

export interface DetallePrecioProductos {

  idDetallePrecioProducto?: string | null;
  totalIva?: number | null;
  porcentaje?: number | null;
  total?: number | null;
  idProducto?: string | null;
  fechaRegistro?: Date | null;
  activo?: boolean | null;
  idIva?: string | null;
  idIvaNavigation?: Ivas | null;
    
}