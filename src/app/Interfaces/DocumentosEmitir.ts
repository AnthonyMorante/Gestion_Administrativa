import { TipoDocumentos } from "./TipoDocumentos";

export  interface DocumentosEmitir {
    idDocumentoEmitir: string;
    nombre?: string | null;
    fechaRegistro?: Date | null;
    activo?: boolean | null;
    idTipoDocumento?: string | null;
    idTipoDocumentoNavigation?: TipoDocumentos | null;
  }
  