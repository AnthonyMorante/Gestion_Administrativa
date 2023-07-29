export interface TipoDocumentos {
    idTipoDocumento: string;
    nombre?: string | null;
    descripcion?: string | null;
    codigo?: number | null;
    activo?: boolean | null;
    fechaRegistro?: Date | null;
  }