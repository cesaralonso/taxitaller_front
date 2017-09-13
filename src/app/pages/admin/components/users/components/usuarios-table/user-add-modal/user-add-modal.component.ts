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
  selector: 'add-service-modal',
  styleUrls: [('./user-add-modal.component.scss')],
  templateUrl: './user-add-modal.component.html'
})

export class UserAddModalComponent implements OnInit {

  modalHeader: string;

  form: FormGroup;
  submitted: boolean = false;

  rol_idrol: AbstractControl;
  password: AbstractControl;
  nombre: AbstractControl;
  email: AbstractControl;


  constructor(private service: UserService,
              private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private authLocalstorage: AuthLocalstorage) {


    this.form = fb.group({
      'rol_idrol': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.rol_idrol = this.form.controls['rol_idrol'];
    this.password = this.form.controls['password'];
    this.nombre = this.form.controls['nombre'];
    this.email = this.form.controls['email'];
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(values: UserInterface): void {
    this.submitted = true;

    if (this.form.valid) {
      this.service
        .addUser(values)
        .subscribe(
            (data: UserResponseInterface) => this.showToast(data));
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


















