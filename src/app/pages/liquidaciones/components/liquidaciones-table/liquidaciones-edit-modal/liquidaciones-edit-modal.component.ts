import { LiquidacionesService } from './../liquidaciones.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LiquidacionesInterface } from './../liquidaciones.interface';

@Component({
    selector: 'app-liquidaciones-edit-modal',
    templateUrl: './liquidaciones-edit-modal.component.html'
})

export class LiquidacionesEditModalComponent extends DialogComponent<LiquidacionesInterface, any> implements OnInit, LiquidacionesInterface {

    idliquidacion: 0;
    folio: '';
    fecha: '';
    liquidacion_a_pagar: 0;
    liquidacion_pagada: 0;
    liquidacion_deuda: 0;
    liquidacion_estatus: '';
    observaciones: '';
    firma: false;
    permiso_idpermiso: 0;
  
    data: any;
    form: FormGroup;
    submitted: boolean = false;

    folioAC: AbstractControl;
    fechaAC: AbstractControl;
    liquidacion_a_pagarAC: AbstractControl;
    liquidacion_pagadaAC: AbstractControl;
    liquidacion_deudaAC: AbstractControl;
    liquidacion_estatusAC: AbstractControl;
    observacionesAC: AbstractControl;
    firmaAC: AbstractControl;
    permiso_idpermisoAC: AbstractControl;


    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private liquidacionesService: LiquidacionesService,
    ) {
        super(dialogService);
        this.form = fb.group({     
            folioAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            fechaAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_a_pagarAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_pagadaAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_deudaAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_estatusAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            observacionesAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            firmaAC : [''],
            permiso_idpermisoAC : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
                
        this.folioAC = this.form.controls['folioAC'];
        this.fechaAC = this.form.controls['fechaAC'];
        this.liquidacion_a_pagarAC = this.form.controls['liquidacion_a_pagarAC'];
        this.liquidacion_pagadaAC = this.form.controls['liquidacion_pagadaAC'];
        this.liquidacion_deudaAC = this.form.controls['liquidacion_deudaAC'];
        this.liquidacion_estatusAC = this.form.controls['liquidacion_estatusAC'];
        this.observacionesAC = this.form.controls['observacionesAC'];
        this.firmaAC = this.form.controls['firmaAC'];
        this.permiso_idpermisoAC = this.form.controls['permiso_idpermisoAC'];
     }

    ngOnInit() { }

    confirm( data ) {
        this.result = data;
        this.close();
    }

    updateLiquidacion( form ) {
        if (form.valid) {
            this.liquidacionesService.editLiquidaciones( {
                data: {
                    idliquidacion: this.idliquidacion,
                    folio: this.folio,
                    fecha: this.fecha,
                    liquidacion_a_pagar: this.liquidacion_a_pagar,
                    liquidacion_pagada: this.liquidacion_pagada,
                    liquidacion_deuda: this.liquidacion_deuda,
                    liquidacion_estatus: this.liquidacion_estatus,
                    observaciones: this.observaciones,
                    firma: this.firma,
                    permiso_idpermiso: this.permiso_idpermiso,
                }
            }).subscribe((data: any) => {
                this.confirm( data );
            });
        }
    }
}