import { Empresas } from "./Empresas";
import { Ivas } from "./Ivas";

export interface Productos {
  idProducto: string;
  codigo?: string | null;
  nombre?: string | null;
  descripcion?: string | null;
  activo?: boolean | null;
  precio?: number | null;
  fechaRegistro?: Date | null;
  idIva?: string | null;
  idEmpresa?: string | null;
  activoProducto?: boolean | null;
  totalIva?: number | null;
  cantidad?: number | null;
  idEmpresaNavigation?: Empresas | null;
  idIvaNavigation?: Ivas | null;
}

  