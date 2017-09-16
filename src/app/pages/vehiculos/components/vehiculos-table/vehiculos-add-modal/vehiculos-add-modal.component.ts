import { VehiculosService } from './../vehiculos.service';
import { VehiculosInterface } from './../vehiculos.interface';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


@Component({
    selector: 'vehiculo-add-modal',
    templateUrl: './vehiculos-add-modal.component.html'
})

export class VehiculosAddModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit  {

    public vehiculo: VehiculosInterface = {
        marca: '',
        modelo: '',
        anio: 1999,
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

    marcaAC: AbstractControl
    modeloAC: AbstractControl
    anioAC: AbstractControl
    serieAC: AbstractControl
    placasAC: AbstractControl
    descripcionAC: AbstractControl
    condicion_inicialAC: AbstractControl
    condicion_actualAC: AbstractControl
    estaus_actividadAC: AbstractControl
    propietario_idpropietarioAC: AbstractControl
    permiso_idpermisoAC: AbstractControl
    fecha_asigancion_permisoAC: AbstractControl
    chofer_idchoferAC: AbstractControl

    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private authLocalstorage: AuthLocalstorage,
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
            'propietario_idpropietarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'permiso_idpermisoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'fecha_asigancion_permisoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        });
                
        this.marcaAC = this.form.controls['marcaAC'];
        this.modeloAC = this.form.controls['modeloAC'];
        this.anioAC = this.form.controls['anioAC'];
        this.serieAC = this.form.controls['serieAC'];
        this.placasAC = this.form.controls['placasAC'];
        this.descripcionAC = this.form.controls['descripcionAC'];
        this.condicion_inicialAC = this.form.controls['condicion_inicialAC'];
        this.condicion_actualAC = this.form.controls['condicion_actualAC'];
        this.estaus_actividadAC = this.form.controls['estaus_actividadAC'];
        this.propietario_idpropietarioAC = this.form.controls['propietario_idpropietarioAC'];
        this.permiso_idpermisoAC = this.form.controls['permiso_idpermisoAC'];
        this.fecha_asigancion_permisoAC = this.form.controls['fecha_asigancion_permisoAC'];
        this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];            
     }



    ngOnInit() { }
    
    confirm() {
        this.result = this.data;
        this.close();
    }

    onSubmit( form ) {
        if (form.valid) {
            this.talleresService.addVehiculos( this.vehiculo )
                .subscribe((data: any) => {  
                    console.log(data);
                    this.data = data;
                    this.confirm();
                });
        }
    }

}