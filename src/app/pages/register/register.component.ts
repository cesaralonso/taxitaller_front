import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';


@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {

  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  rol_idrol: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;

  submitted: boolean = false;

  constructor(fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'rol_idrol': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.rol_idrol = this.form.controls['rol_idrol'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      
      this.authService.signup(values)
        .subscribe(
          (data) => {
            if (data.status === 'success') {
              this.toastrService.success(data.message);
            } else {
              this.toastrService.error(data.message);
            }
        });
    }
  }
}
