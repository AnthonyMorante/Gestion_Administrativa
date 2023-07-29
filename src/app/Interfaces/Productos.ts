import { Empresas } from "./Empresas";
import { Ivas } from "./Ivas";

export interface Productos {
    idProducto?: string | null;
    codigo?: string | null;
    nombre?: string | null;
    descripcion?: string | null;
    activo?: boolean | null;
    precio?: number | null;
    fechaRegistro?: Date | null;
    cantidad?: number | null;
    idIva?: string | null;
    idEmpresa?: string | null;
    idEmpresaNavigation?: Empresas | null;
    idIvaNavigation?: Ivas | null;
  }
  