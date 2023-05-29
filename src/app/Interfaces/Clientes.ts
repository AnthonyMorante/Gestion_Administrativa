import { Ciudades } from "./Ciudades";
import { TipoIdentificaciones } from "./TipoIdentificaciones";

export interface Clientes {

    IdCliente?: string | null;
    Identificacion?: string | null;
    RazonSocial?: string | null;
    Representante?: string | null;
    Direccion?: string | null;
    Email?: string | null;
    Telefono?: string | null;
    Observacion?: string | null;
    FechaRegistro?: Date | null;
    IdCiudad?: string | null ;
    IdTipoIdentificacion?: string | null ;
    IdCiudadNavigation?: Ciudades | null ;
    IdTipoIdentificacionNavigation?: TipoIdentificaciones | null;

  }

