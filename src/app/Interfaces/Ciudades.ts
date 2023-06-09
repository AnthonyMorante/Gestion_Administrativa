import { Provincias } from "./Provincias";

export interface Ciudades {
    idCiudad: string |null;
    nombre?: string | null;
    fechaRegistro?: Date | null;
    activo?: boolean | null;
    idProvincia?: string |null;
    idProvinciaNavigation: Provincias;

  }
  