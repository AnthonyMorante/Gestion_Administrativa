import { Clientes } from "./Clientes";
import { TipoNegocios } from "./TipoNegocios";

export interface Empresas {
    idEmpresa: string;
    identificacion?: string | null;
    razonSocial?: string | null;
    telefono?: string | null;
    llevaContabilidad?: boolean | null;
    regimenMicroempresas?: boolean | null;
    regimenRimpe?: boolean | null;
    agenteRetencion?: boolean | null;
    idTipoNegocio?: string | null;
    activo?: boolean | null;
    idEmpresaNavigation: Empresas;
    idTipoNegocioNavigation?: TipoNegocios | null;
  }