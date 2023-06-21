import { Ciudades } from "./Ciudades";
import { Empresas } from "./Empresas";
import { TipoIdentificaciones } from "./TipoIdentificaciones";

export interface Empleados {
    idEmpleado?: string | null;
    identificacion?: string | null;
    razonSocial?: string | null;
    direccion?: string | null;
    email?: string | null;
    telefono?: string | null;
    observacion?: string | null;
    fechaRegistro?: Date | null;
    idCiudad?: string | null;
    idTipoIdentificacion?: string | null;
    idEmpresa?: string | null;
    activo?: boolean | null;
    idCiudadNavigation?: Ciudades | null;
    idEmpresaNavigation?: Empresas | null;
    idTipoIdentificacionNavigation?: TipoIdentificaciones | null;
  }