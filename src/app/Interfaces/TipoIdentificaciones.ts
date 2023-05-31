export interface TipoIdentificaciones {

    idTipoIdentificacion: string;
    nombre: string;
    descripcion?: string | null;
    fechaRegistro?: Date | null;
    activo?: boolean | null;
    codigo?: number | null;

  }