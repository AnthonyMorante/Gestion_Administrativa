import { Clientes } from "./Clientes";

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
    // clientes: Clientes[];
    // empleados: Empleados[];
    // idEmpresaNavigation: Empresas;
    // idTipoNegocioNavigation?: TipoNegocios | null;
    // inverseIdEmpresaNavigation?: Empresas | null;
    // productos: Productos[];
    // proveedores: Proveedores[];
  }