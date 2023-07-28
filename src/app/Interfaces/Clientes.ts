import { Ciudades } from "./Ciudades";
import { TipoIdentificaciones } from "./TipoIdentificaciones";

export interface Clientes {

    idCliente?: string | null;
    identificacion?: string | null;
    razonSocial?: string | null;
    representante?: string | null;
    direccion?: string | null;
    email?: string | null;
    telefono?: string | null;
    observacion?: string | null;
    fechaRegistro?: Date | null;
    idCiudad?: string | null ;
    idEmpresa?: string | null ;
    idTipoIdentificacion?: string | null ;
    idCiudadNavigation?: Ciudades | null ;
    dTipoIdentificacionNavigation?: TipoIdentificaciones | null;
    

  }

