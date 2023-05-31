import { Provincias } from "./Provincias";

export interface Ciudades {
    idCiudad: string;
    nombre?: string | null;
    fechaRegistro?: Date | null;
    activo?: boolean | null;
    idProvincia: string;
    idProvinciaNavigation: Provincias;

  }
  