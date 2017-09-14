import { VehiculosInterface } from './../vehiculos.interface';
import { VehiculosService } from './../vehiculos.service';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


@Component({
    selector: 'vehiculo-add-modal',
    templateUrl: './vehiculo-add-modal.component.html'
})

export class VehiculoAddModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit  {

    public vehiculo: VehiculosInterface = {
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
    public response: any = {
        status: 'success',
        message: 'Ha sido agregado correctamente',
        data: this.vehiculo,
    };

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
        private vehiculosService: VehiculosService
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
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code

        this.result = this.response;
        this.close();
    }

    onSubmit( val ) {
        if (this.form.valid) {
            this.vehiculosService.addVehiculos(val)
                .subscribe((data: any) => {
                    // Toast is going to be displayed in the other component
                    // this.showToast(data, val)
                    // this.response = data;
                    confirm();
                });
        }
    }


}