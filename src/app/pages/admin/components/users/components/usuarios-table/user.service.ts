import { AuthLocalstorage } from './../../../../../../shared/auth-localstorage.service';
import { UserResponseInterface } from './user-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { UserInterface } from './user.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    private actionUrl: string;
    private headers: Headers;


    constructor(
        private _http: Http, 
        private _configuration: Configuration, 
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', this.authLocalstorage.getToken());
    }

    addUser = (user: UserInterface): Observable<UserResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}signup`;
        const toAdd = JSON.stringify(user);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <UserResponseInterface>response.json())
            .catch(this.handleError);
    }

    editUser = (user: UserInterface): Observable<UserResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}putUser/${user.id}`;
        const toAdd = JSON.stringify(user);
        return this._http.put(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <UserResponseInterface>response.json())
            .catch(this.handleError);
    }

    getUser = (id: number): Observable<UserResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getUser/${id}`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <UserResponseInterface>response.json())
            .catch(this.handleError);
    }

    getAllUsers = (): Observable<UserResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getUsers`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <UserResponseInterface>response.json())
            .catch(this.handleError);
    }


    deleteUser = (id: string): Observable<UserResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}deleteUser/${id}`;
        return this._http.delete(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <UserResponseInterface>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}


