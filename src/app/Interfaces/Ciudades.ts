import { Provincias } from "./Provincias";

export interface Ciudades {
    IdCiudad: string;
    Nombre?: string | null;
    FechaRegistro?: Date | null;
    Activo?: boolean | null;
    IdProvincia: string;
    IdProvinciaNavigation: Provincias;

  }
  