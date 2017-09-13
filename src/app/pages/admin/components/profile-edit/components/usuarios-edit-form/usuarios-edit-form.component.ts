import { UserInterface } from './../../../users/components/usuarios-table/user.interface';
import { UserService } from './../../../users/components/usuarios-table/user.service';
import { Modals } from './../../../../../ui/components/modals/modals.component';
import { AuthLocalstorage } from './../../../../../../shared/auth-localstorage.service';
import { UserResponseInterface } from './../../../users/components/usuarios-table/user-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'usuarios-edit-form',
  templateUrl: './usuarios-edit-form.html'
})

export class UsuariosEditForm implements OnInit {

  modalHeader: string;

  idUser: number;
  user: any;

  toInt(tochange: any): number {
      return +tochange;
  }

  form: FormGroup;
  submitted: boolean = false;
  id: AbstractControl;
  rol_idrol: AbstractControl;
  nombre: AbstractControl;
  email: AbstractControl;


  constructor(private service: UserService,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private authLocalstorage: AuthLocalstorage) {

    this.form = fb.group({
      'id': [this.idUser],
      'rol_idrol': [''],
      'nombre': [''],
      'email': [''],
    });

    const credentials = this.authLocalstorage.getCredentials();
    this.idUser = this.toInt(credentials.iduser);

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
    } else {
      this.toastrService.error(data.message);
    }
  }


}



