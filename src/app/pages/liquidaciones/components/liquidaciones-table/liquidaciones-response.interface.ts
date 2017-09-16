export interface LiquidacionesResponseInterface {
    status?: string;
    message?: string;
    data: {
        idtaller?: number;
        nombre: string;
        direccion: string;
        descripcion: string;
        telefono: string;
        lat: string;
        lng: string;
        baja: boolean;
        created_at: string;
        created_by: string;
    }
} 
