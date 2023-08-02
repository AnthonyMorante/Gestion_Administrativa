
import { Empresas } from "./Empresas";
import { TipoDocumentos } from "./TipoDocumentos";

export interface Secuenciales {
    idSecuencial: string;
    nombre?: number | null;
    activo?: boolean | null;
    fechaRegistro?: Date | null;
    idEmpresa?: string | null;
    idTipoDocumento?: string | null;
    idEmpresaNavigation?: Empresas | null;
    idTipoDocumentoNavigation?: TipoDocumentos | null;
}