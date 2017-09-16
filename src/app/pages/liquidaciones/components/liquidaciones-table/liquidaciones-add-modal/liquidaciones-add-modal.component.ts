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

    public taller: LiquidacionesInterface = {
        nombre: '',
        direccion: '',
        descripcion: '',
        telefono: '',
        lat: '',
        lng: '',
        baja: false,
        created_at: '',
        created_by: '',
    };

    data: any;

    modalHeader: string;
    
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
        private authLocalstorage: AuthLocalstorage,
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
    
    confirm() {
        this.result = this.data;
        this.close();
    }

    onSubmit( form ) {
        if (form.valid) {
            this.liquidacionesService.addLiquidaciones( this.taller )
                .subscribe((data: any) => {                        
                    this.data = data;
                    this.confirm();
                });
        }
    }


}