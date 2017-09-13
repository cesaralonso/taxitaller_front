import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './../app.constants';
import { LoginInterface } from './../pages/login/login.interface';
import { LoginResponseInterface } from './../pages/login/login-response.interface';


export interface RegisterInterface {
  nombre: string;
  email: string;
  password: string;
  rol_idrol: string;
}



@Injectable()
export class AuthService {
    
    isLoggedIn: boolean = (
        this.toBoolean(
            this.localStorageService.get('isLoggedIn') ? this.localStorageService.get('isLoggedIn') : false,
        )
    );

    profileAvatar: string = (
        this.localStorageService.get('profileAvatar') ? this.localStorageService.get('isLoggedIn').toString() : ''
    );

    toBoolean(object: any): boolean {
        return (object.toString() === 'true') ? true : false;
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    private actionUrl: string;
    private headers: Headers;

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private localStorageService: LocalStorageService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    login(values): Observable<any> {
        this.actionUrl = `${this._configuration.serverWithApiUrl}login`;

        const login = {
            email: values.email,
            password: values.password,
        }
        const toAdd = JSON.stringify(login);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)
            .do(val => this.isLoggedIn = true);
    }

    signup(values): Observable<any> {
        this.actionUrl = `${this._configuration.serverWithApiUrl}signup`;

        const register = {
            nombre: values.name,
            email: values.email,
            password: values.passwords.password,
            rol_idrol: values.rol_idrol,
        }
        const toAdd = JSON.stringify(register);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    logout(): void {
        this.isLoggedIn = false;
        this.localStorageService.set('isLoggedIn', false);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }




}



