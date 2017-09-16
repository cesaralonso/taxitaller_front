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
    
    idtaller: 0;
    nombre: '';
    direccion: '';
    descripcion: '';
    telefono: '';
    lat: '';
    lng: '';
    baja: false;
    created_at: '';
    created_by: '';

    data: any;
    form: FormGroup;
    submitted: boolean = false;

    nombreAC: AbstractControl;
    direccionAC : AbstractControl;
    descripcionAC : AbstractControl;
    telefonoAC : AbstractControl;
    latAC : AbstractControl;
    lngAC : AbstractControl;


    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private liquidacionesService: LiquidacionesService
    ) {
        super(dialogService);
        this.form = fb.group({
            
            'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'direccionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'descripcionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'telefonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'latAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'lngAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            
        });
                
        this.nombreAC = this.form.controls['nombreAC'];
        this.direccionAC = this.form.controls['direccionAC'];
        this.descripcionAC = this.form.controls['descripcionAC'];
        this.telefonoAC = this.form.controls['telefonoAC'];
        this.latAC = this.form.controls['latAC'];
        this.lngAC = this.form.controls['lngAC'];
     }

    ngOnInit() { }

    confirm( data ) {
        this.result = data;
        console.log('From modal: ' + this.result);
        this.close();
    }

    updateLiquidacion( form ) {
        console.log('submitted');
        if (form.valid) {
            this.liquidacionesService.editLiquidaciones( {
                data: {
                    idtaller: this.idtaller,
                    nombre: this.nombre,
                    direccion: this.direccion,
                    descripcion: this.descripcion,
                    telefono: this.telefono,
                    lat: this.lat,
                    lng: this.lng,
                    baja: this.baja,
                    created_at: this.created_at,
                    created_by: this.created_by,
                }
            }).subscribe((data: any) => {
                this.confirm( data );
            });
        }
    }
}