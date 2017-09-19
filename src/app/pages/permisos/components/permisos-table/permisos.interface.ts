export interface PermisosInterface {
    idpermiso?: number;
    permiso: string;
    descripcion: string;
    fecha_inicio: string;
    vigencia: string;
    liquidacion_diaria: number;
    liquidacion_domingo: number;
    baja?: boolean;
    created_at?: string;
    created_by?: number;  
}