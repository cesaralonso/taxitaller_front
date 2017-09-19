import { PermisosService } from './../../permisos.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { PermisosInterface } from './../permisos.interface';

@Component({
    selector: 'app-permisos-edit-modal',
    templateUrl: './permisos-edit-modal.component.html'
})

export class PermisosEditModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit, PermisosInterface {

    idpermiso: 0;
    permiso: '';
    descripcion: '';
    fecha_inicio: '';
    vigencia: '';
    liquidacion_diaria: 0;
    liquidacion_domingo: 0;

    data: any;
    form: FormGroup;
    submitted: boolean = false;

    permisoAC: AbstractControl;
    descripcionAC: AbstractControl;
    fecha_inicioAC: AbstractControl;
    vigenciaAC: AbstractControl;
    liquidacion_diariaAC: AbstractControl;
    liquidacion_domingoAC: AbstractControl;


    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private permisosService: PermisosService,
    ) {
        super(dialogService);
        this.form = fb.group({     
            permisoAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            descripcionAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            fecha_inicioAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            vigenciaAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_diariaAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            liquidacion_domingoAC: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
                
        this.permisoAC = this.form.controls['permisoAC'];
        this.descripcionAC = this.form.controls['descripcionAC'];
        this.fecha_inicioAC = this.form.controls['fecha_inicioAC'];
        this.vigenciaAC = this.form.controls['vigenciaAC'];
        this.liquidacion_diariaAC = this.form.controls['liquidacion_diariaAC'];
        this.liquidacion_domingoAC = this.form.controls['liquidacion_domingoAC'];
     }

    ngOnInit() { }

    confirm( data ) {
        this.result = data;
        this.close();
    }

    updatepermiso( form ) {
        if (form.valid) {
            this.permisosService.editPermisos( {
                data: {
                    idpermiso: this.idpermiso,
                    permiso: this.permiso,
                    descripcion: this.descripcion,
                    fecha_inicio: this.fecha_inicio,
                    vigencia: this.vigencia,
                    liquidacion_diaria: this.liquidacion_diaria,
                    liquidacion_domingo: this.liquidacion_domingo,
                }
            }).subscribe((data: any) => {
                this.confirm( data );
            });
        }
    }
}