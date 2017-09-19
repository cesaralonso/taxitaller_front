import { LiquidacionesInterface } from './../liquidaciones.interface';
import { LiquidacionesService } from './../liquidaciones.service';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


@Component({
    selector: 'liquidaciones-add-modal',
    templateUrl: './liquidaciones-add-modal.component.html'
})

export class LiquidacionesAddModalComponent extends DialogComponent<LiquidacionesInterface, any> implements OnInit  {

    liquidaciones: LiquidacionesInterface = {
        folio: '',
        fecha: '',
        liquidacion_a_pagar: 0,
        liquidacion_pagada: 0,
        liquidacion_deuda: 0,
        liquidacion_estatus: '',
        observaciones: '',
        firma: false,
        permiso_idpermiso: 0,
    };

    data: any;

    modalHeader: string;
    
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
        private authLocalstorage: AuthLocalstorage,
        private liquidacionesService: LiquidacionesService,
    ) {
        super(dialogService);

        this.form = fb.group({
            folioAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            fechaAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_a_pagarAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_pagadaAC: [''],
            liquidacion_deudaAC: [''],
            liquidacion_estatusAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            observacionesAC: [''],
            firmaAC: [''],
            permiso_idpermisoAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
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
    
    confirm() {
        this.result = this.data;
        this.close();
    }

    onSubmit( form ) {
        if (form.valid) {
            this.liquidacionesService.addLiquidaciones( this.liquidaciones )
                .subscribe((data: any) => {                        
                    this.data = data;
                    this.confirm();
                });
        }
    }


}