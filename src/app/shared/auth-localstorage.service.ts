import { CredentialsInterface } from './credentials.interface';
import { Observable } from 'rxjs/Observable';
import { LoginInterface } from './../pages/login/login.interface';
import { LoginResponseInterface } from './../pages/login/login-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthLocalstorage {

  constructor(private localStorageService: LocalStorageService) {
  }

  toInt(tochange: any): number {
      return +tochange;
  }

  setAvatar(profileAvatar): void {
      this.localStorageService.set('profileAvatar', profileAvatar);
  }

  setCredentials(loginresponse: LoginResponseInterface): void {
      this.localStorageService.clearAll();
      this.localStorageService.set('isLoggedIn', true);
      this.localStorageService.set('email', loginresponse.user.email);
      this.localStorageService.set('nombre', loginresponse.user.nombre);
      this.localStorageService.set('acceso', loginresponse.user.acceso);
      this.localStorageService.set('iduser', loginresponse.user.iduser);
      this.localStorageService.set('rol_idrol', loginresponse.user.rol_idrol);
      this.localStorageService.set('token', loginresponse.token);
  }

  getCredentials(): CredentialsInterface {
      const credentials: CredentialsInterface = {
        'iduser': this.localStorageService.get('iduser').toString(),
        'email': this.localStorageService.get('email').toString(),
        'token': this.localStorageService.get('token').toString()
      }
      return credentials;
  }

  getToken(): any {
      return ((this.localStorageService.get('token')) ? this.localStorageService.get('token').toString() : '');
  }

  clearAll(): void {
      this.localStorageService.clearAll();
  }


}