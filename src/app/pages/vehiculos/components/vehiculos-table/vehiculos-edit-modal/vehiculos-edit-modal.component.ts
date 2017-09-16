import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiculosService } from './../vehiculos.service';
import { VehiculosInterface } from './../vehiculos.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'app-vehiculos-edit-modal',
    templateUrl: './vehiculos-edit-modal.component.html'
})

export class VehiculosEditModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit, VehiculosInterface {
    
    idvehiculo: number;    
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

    data: any;
    form: FormGroup;
    submitted: boolean = false;

    marcaAC: AbstractControl;
    modeloAC: AbstractControl;
    anioAC: AbstractControl;
    serieAC: AbstractControl;
    placasAC: AbstractControl;
    descripcionAC: AbstractControl;
    condicion_inicialAC: AbstractControl;
    condicion_actualAC: AbstractControl;
    estaus_actividadAC: AbstractControl;
    bajaAC: AbstractControl;
    propietario_idpropietarioAC: AbstractControl;
    permiso_idpermisoAC: AbstractControl;
    fecha_asigancion_permisoAC: AbstractControl;
    chofer_idchoferAC: AbstractControl;


    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private talleresService: VehiculosService
    ) {
        super(dialogService);
        this.form = fb.group({
            
            'marcaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'modeloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'anioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'serieAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'placasAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'descripcionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'condicion_inicialAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'condicion_actualAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'estaus_actividadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'propietario_idpropietarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'permiso_idpermisoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'fecha_asigancion_permisoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
                
        this.marcaAC = this.form.controls['marcaAC']
        this.modeloAC = this.form.controls['modeloAC']
        this.anioAC = this.form.controls['anioAC']
        this.serieAC = this.form.controls['serieAC']
        this.placasAC = this.form.controls['placasAC']
        this.descripcionAC = this.form.controls['descripcionAC']
        this.condicion_inicialAC = this.form.controls['condicion_inicialAC']
        this.condicion_actualAC = this.form.controls['condicion_actualAC']
        this.estaus_actividadAC = this.form.controls['estaus_actividadAC']
        this.bajaAC = this.form.controls['bajaAC']
        this.propietario_idpropietarioAC = this.form.controls['propietario_idpropietarioAC']
        this.permiso_idpermisoAC = this.form.controls['permiso_idpermisoAC']
        this.fecha_asigancion_permisoAC = this.form.controls['fecha_asigancion_permisoAC']
        this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC']
    }

    ngOnInit() { }

    confirm( data ) {
        this.result = data;
        console.log('From modal: ' + this.result);
        this.close();
    }

    updateVehiculos( form ) {
        console.log('submitted');
        if (form.valid) {
            this.talleresService.editVehiculos({
                data: {
                    idvehiculo: this.idvehiculo,
                    marca: this.marca,
                    modelo: this.modelo,
                    anio: this.anio,
                    serie: this.serie,
                    placas: this.placas,
                    descripcion: this.descripcion,
                    condicion_inicial: this.condicion_inicial,
                    condicion_actual: this.condicion_actual,
                    estaus_actividad: this.estaus_actividad,
                    baja: this.baja,
                    propietario_idpropietario: this.propietario_idpropietario,
                    permiso_idpermiso: this.permiso_idpermiso,
                    fecha_asigancion_permiso: this.fecha_asigancion_permiso,
                    chofer_idchofer: this.chofer_idchofer,
                    created_at: this.created_at,
                    created_by: this.created_by,
                }
            
            }).subscribe(  data => {
                this.confirm( data );
            });
        }
    }
}