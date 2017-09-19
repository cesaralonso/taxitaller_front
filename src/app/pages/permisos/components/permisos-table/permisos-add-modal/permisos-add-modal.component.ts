import { PermisosInterface } from './../permisos.interface';
import { PermisosService } from './../../permisos.service';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


@Component({
    selector: 'permisos-add-modal',
    templateUrl: './permisos-add-modal.component.html'
})

export class PermisosAddModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit {

    permisos: PermisosInterface = {
        idpermiso: 0,
        permiso: '',
        descripcion: '',
        fecha_inicio: '',
        vigencia: '',
        liquidacion_diaria: 0,
        liquidacion_domingo: 0,
    };

    data: any;

    modalHeader: string;
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
        private authLocalstorage: AuthLocalstorage,
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
    
    confirm() {
        this.result = this.data;
        this.close();
    }

    onSubmit( form ) {
        if (form.valid) {
            this.permisosService.addPermisos( this.permisos )
                .subscribe((data: any) => {                        
                    this.data = data;
                    this.confirm();
                });
        }
    }


}