export interface VehiculosInterface {
    idvehiculo?: number;
    marca: string;
    modelo: string;
    anio: number;
    serie: string;
    placas: string;
    descripcion: string;
    condicion_inicial: string;
    condicion_actual: string;
    estaus_actividad: string;
    baja: boolean;
    propietario_idpropietario: number;
    permiso_idpermiso: number;
    fecha_asigancion_permiso: string;
    chofer_idchofer: number;
    created_at: string;
    created_by: string;
}
