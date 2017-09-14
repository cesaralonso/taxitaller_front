import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { layoutPaths } from './../../../../../theme/theme.constants';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TalleresService } from './../talleres.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TalleresInterface } from './../talleres.interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./talleres-add-modal.component.scss')],
  templateUrl: './talleres-add-modal.component.html'
})

export class TalleresAddModalComponent implements OnInit {s

  // _estatustalleres: string[];
  // _razonsocialasociado: string[];
  // _razonsocialconstructor: string[];
  // _razonsocialcontratista: string[];
  // _razonsocialcliente: string[];
  // _tipoobra: string[];

  modalHeader: string;

  form: FormGroup;
  submitted: boolean = false;

  nombre: AbstractControl;
  direccion: AbstractControl;
  descripcion: AbstractControl;
  telefono: AbstractControl;
  lat: AbstractControl;
  lng: AbstractControl;

  constructor(
    private service: TalleresService,
    private activeModal: NgbActiveModal,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage
  ) {

      this.form = fb.group({
  
        'nombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'direccion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'descripcion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'telefono' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'lat' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'lng' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        
      });
      
      this.nombre = this.form.controls['nombre'];
      this.direccion = this.form.controls['direccion'];
      this.descripcion = this.form.controls['descripcion'];
      this.telefono = this.form.controls['telefono'];
      this.lat = this.form.controls['lat'];
      this.lng = this.form.controls['lng'];
  }


  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(values: any): void {
    if (this.form.valid) {
      this.service.addTalleres(values)
        .subscribe((data: any) => this.showToast(data, values));
    }
  }

  private showToast(data: any, values: any) {
    if (data.idRespuesta === 0) {

      this.toastrService.success(data.mensajeRespuesta);
      this.closeModal();
    }

    if (data.idRespuesta === -1) {
      this.toastrService.error(data.mensajeRespuesta);
    }
  }


}
