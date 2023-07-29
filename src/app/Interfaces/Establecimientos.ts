import { Empresas } from "./Empresas";

export interface Establecimientos {
    idEstablecimiento: string;
    nombre?: number | null;
    predeterminado?: boolean | null;
    descripcion?: string | null;
    activo?: boolean | null;
    idEmpresa?: string | null;
    fechaRegistro?: Date | null;
    idEmpresaNavigation?: Empresas | null;
}
