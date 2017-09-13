import { UserResponseInterface } from './../user-response.interface';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from './../user.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { UserInterface } from './../user.interface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./user-edit-modal.component.scss')],
  templateUrl: './user-edit-modal.component.html'
})

export class UserEditModalComponent implements OnInit {

  modalHeader: string;
  idUser: number;
  user: any;


  form: FormGroup;
  submitted: boolean = false;
  id: AbstractControl;
  rol_idrol: AbstractControl;
  nombre: AbstractControl;
  email: AbstractControl;


  constructor(private service: UserService,
              private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private authLocalstorage: AuthLocalstorage) {

    this.form = fb.group({
      'id': [this.id],
      'rol_idrol': [''],
      'nombre': [''],
      'email': [''],
    });

    this.rol_idrol = this.form.controls['rol_idrol'];
    this.nombre = this.form.controls['nombre'];
    this.email = this.form.controls['email'];
  }


  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.service
      .getUser(this.idUser)
      .subscribe(
        (user: UserResponseInterface) => {
          this.user = user.data[0];
        });
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(values: UserInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editUser(values)
        .subscribe(
            (data: any) => this.showToast(data));
    }
  }

  private showToast(data: UserResponseInterface) {
    if (data.status === 'success') {
      this.toastrService.success(data.message);
      this.closeModal();
    } else {
      this.toastrService.error(data.message);
    }
  }


}


















