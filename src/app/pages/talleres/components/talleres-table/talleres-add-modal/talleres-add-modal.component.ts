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

  _estatustalleres: string[];
  _razonsocialasociado: string[];
  _razonsocialconstructor: string[];
  _razonsocialcontratista: string[];
  _razonsocialcliente: string[];
  _tipoobra: string[];

  modalHeader: string;

  form: FormGroup;
  submitted: boolean = false;

  descripcion: AbstractControl;
  direccion: AbstractControl;
  medidasterreno: AbstractControl;
  medidasconstruccion: AbstractControl;
  fechainicio: AbstractControl;
  fechafin: AbstractControl;
  idtipoobra: AbstractControl;
  presupuesto: AbstractControl;
  idrazonsocialcliente: AbstractControl;
  idrazonsocialcontratista: AbstractControl;
  idrazonsocialconstructor: AbstractControl;
  idrazonsocialasociado: AbstractControl;
  posiciongps: AbstractControl;
  idestatusobra: AbstractControl;
  observaciones: AbstractControl;


  constructor(private service: TalleresService,
              private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private authLocalstorage: AuthLocalstorage) {
    
    this._estatustalleres = [];
    this._razonsocialasociado = [];
    this._razonsocialconstructor = [];
    this._razonsocialcontratista = [];
    this._razonsocialcliente = [];
    this._tipoobra = [];

    this.form = fb.group({

      'descripcion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'direccion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'medidasterreno' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'medidasconstruccion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechainicio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechafin' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idtipoobra' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'presupuesto' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialcliente' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialcontratista' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialconstructor' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialasociado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'posiciongps' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idestatusobra' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'observaciones' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      
    });

    this.descripcion = this.form.controls['descripcion'];
    this.direccion = this.form.controls['direccion'];
    this.medidasterreno = this.form.controls['medidasterreno'];
    this.medidasconstruccion = this.form.controls['medidasconstruccion'];
    this.fechainicio = this.form.controls['fechainicio'];
    this.fechafin = this.form.controls['fechafin'];
    this.idtipoobra = this.form.controls['idtipoobra'];
    this.presupuesto = this.form.controls['presupuesto'];
    this.idrazonsocialcliente = this.form.controls['idrazonsocialcliente'];
    this.idrazonsocialcontratista = this.form.controls['idrazonsocialcontratista'];
    this.idrazonsocialconstructor = this.form.controls['idrazonsocialconstructor'];
    this.idrazonsocialasociado = this.form.controls['idrazonsocialasociado'];
    this.posiciongps = this.form.controls['posiciongps'];
    this.idestatusobra = this.form.controls['idestatusobra'];
    this.observaciones = this.form.controls['observaciones'];
  }


  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addTalleres(values)
        .subscribe(
            (data: any) => this.showToast(data, values));
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
