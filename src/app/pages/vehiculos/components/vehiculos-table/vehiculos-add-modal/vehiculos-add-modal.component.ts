import { VehiculosInterface } from './../vehiculos.interface';
import { VehiculosService } from './../vehiculos.service';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


@Component({
    selector: 'vehiculos-add-modal',
    templateUrl: './vehiculos-add-modal.component.html'
})

export class VehiculosAddModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit  {

    taller: VehiculosInterface = {
        marca: '',
        modelo: '',
        anio: 0,
        serie: '',
        placas: '',
        descripcion: '',
        condicion_inicial: '',
        condicion_actual: '',
        estaus_actividad: '',
        baja: false,
        propietario_idpropietario: 0,
        permiso_idpermiso: 0,
        fecha_asigancion_permiso: '',
        chofer_idchofer: 0,
        created_at: '',
        created_by: '',
    };

    data: any;

    modalHeader: string;
    
    form: FormGroup;
    submitted: boolean = false;

    marca: AbstractControl;
    modelo: AbstractControl;
    anio: AbstractControl;
    serie: AbstractControl;
    placas: AbstractControl;
    descripcion: AbstractControl;
    condicion_inicial: AbstractControl;
    condicion_actual: AbstractControl;
    estaus_actividad: AbstractControl;
    propietario_idpropietario: AbstractControl;
    permiso_idpermiso: AbstractControl;
    fecha_asigancion_permiso: AbstractControl;
    chofer_idchofer: AbstractControl;



    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private authLocalstorage: AuthLocalstorage,
        private vehiculosService: VehiculosService,
    ) {
        super(dialogService);

        this.form = fb.group({
            marca:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            modelo:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            anio:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            serie:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            placas:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            descripcion:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            condicion_inicial:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            condicion_actual:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            estaus_actividad:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            propietario_idpropietario:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            permiso_idpermiso:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            fecha_asigancion_permiso:['', Validators.compose([Validators.required, Validators.minLength(1)])],
            chofer_idchofer:['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
            
        this.marca = this.form.controls['marca'];
        this.modelo = this.form.controls['modelo'];
        this.anio = this.form.controls['anio'];
        this.serie = this.form.controls['serie'];
        this.placas = this.form.controls['placas'];
        this.descripcion = this.form.controls['descripcion'];
        this.condicion_inicial = this.form.controls['condicion_inicial'];
        this.condicion_actual = this.form.controls['condicion_actual'];
        this.estaus_actividad = this.form.controls['estaus_actividad'];
        this.propietario_idpropietario = this.form.controls['propietario_idpropietario'];
        this.permiso_idpermiso = this.form.controls['permiso_idpermiso'];
        this.fecha_asigancion_permiso = this.form.controls['fecha_asigancion_permiso'];
        this.chofer_idchofer = this.form.controls['chofer_idchofer'];
     }

    ngOnInit() { }
    
    confirm() {
        this.result = this.data;
        this.close();
    }

    onSubmit( form ) {
        if (form.valid) {
            this.vehiculosService.addVehiculos( this.taller )
                .subscribe((data: any) => {                        
                    this.data = data;
                    this.confirm();
                });
        }
    }


}