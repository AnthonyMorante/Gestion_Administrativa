import { Ciudades } from "./Ciudades";
import { Empresas } from "./Empresas";
import { TipoIdentificaciones } from "./TipoIdentificaciones";

export interface Proveedores {

    idProveedor?: string | null;
    identificacion?: string | null;
    razonSocial?: string | null;
    representante?: string | null;
    direccion?: string | null;
    email?: string | null;
    telefono?: string | null;
    paginaWeb?: string | null;
    observacion?: string | null;
    idCiudad?: string | null;
    idTipoIdentificacion?: string | null;
    idEmpresa?: string | null;
    activo?: boolean | null;
    idCiudadNavigation?: Ciudades | null;
    idEmpresaNavigation?: Empresas | null;
    idTipoIdentificacionNavigation?: TipoIdentificaciones | null;
  }