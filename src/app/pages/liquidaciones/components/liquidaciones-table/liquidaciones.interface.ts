export interface LiquidacionesInterface {
    idliquidacion?: number;
    folio: string;
    fecha: string;
    liquidacion_a_pagar: number;
    liquidacion_pagada: number;
    liquidacion_deuda: number;
    liquidacion_estatus: string;
    observaciones: string;
    firma: boolean;
    baja?: boolean;
    permiso_idpermiso: number;
    created_at?: string;
    created_by?: number;
}



