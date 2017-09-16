export interface PermisosResponseInterface {
    status?: string;
    message?: string;
    data: {
        idpermiso?: number,
        permiso: string,
        descripcion: string,
        fecha_inicio: string ,
        vigencia: string ,
        liquidacion_diaria: string ,
        liquidacion_domingo: string ,
        baja: boolean,
        created_at: string,
        created_by: string,  
    }
} 