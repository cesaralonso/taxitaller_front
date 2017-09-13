import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { GroupsService } from './../groups.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./groups-edit-modal.component.scss')],
  templateUrl: './groups-edit-modal.component.html'
})

export class GroupsEditModalComponent implements OnInit {

  modalHeader: string;
  id: number;
  item: any;

  form: FormGroup;
  submitted: boolean = false;

  nicknameauth: AbstractControl;
  usuarioauth: AbstractControl;
  claveauth: AbstractControl;
  idrol: AbstractControl;
  rol: AbstractControl;
  descripcion: AbstractControl;
  visible: AbstractControl;


  constructor(private service: GroupsService,
              private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private authLocalstorage: AuthLocalstorage) {

    this.item = {
      idrol: 0,
      rol: '',
      descripcion: '',
      visible: false,
    }

    this.form = fb.group({

      'idrol': this.id,
      'rol': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcion': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'visible': [''],
    });

    this.rol = this.form.controls['rol'];
    this.descripcion = this.form.controls['descripcion'];
    this.visible = this.form.controls['visible'];
  }

  ngOnInit() {
    this.service
      .getGroups(this.id)
      .subscribe(
        (item: any) => this.item = item[1]);
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editGroups(values)
        .subscribe(
            (data: any) => this.showToast(data, values));
    }
  }

  private showToast(data: any, values: any) {
    if (data.idRespuesta === 0) {

      this.toastrService.success(data.mensajeRespuesta);
      this.closeModal();
    } else {
      this.toastrService.error(data.mensajeRespuesta);
    }
  }


}


















