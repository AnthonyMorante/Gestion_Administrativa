export interface FormaPagos {
    idFormaPago: string;
    nombre?: string | null;
    descripcion?: string | null;
    activo?: boolean | null;
    fechaRegistro?: Date | null;
    codigo?: number | null;
}