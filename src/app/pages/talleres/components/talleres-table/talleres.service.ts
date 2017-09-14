import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { TalleresResponseInterface } from './talleres-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { TalleresInterface } from './talleres.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TalleresService {

    private actionUrl: string;
    private headers: Headers;


    constructor(
        private _http: Http, 
        private _configuration: Configuration, 
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }


    addTalleres = (taller: TalleresInterface): Observable<TalleresResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}postTaller`;
        const toAdd = JSON.stringify(taller);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface>response.json())
            .catch(this.handleError);
    }

    editTalleres = (taller: TalleresInterface): Observable<TalleresResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}putTalleres/${taller.idtaller}`;
        const toAdd = JSON.stringify(taller);
        return this._http.put(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface>response.json())
            .catch(this.handleError);
    }

    getTalleres = (id: number): Observable<TalleresInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getTalleres/${id}`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => {<TalleresInterface>response.json()})
            .catch(this.handleError);
    }

    getAllTalleres = (): Observable<TalleresResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getTalleres`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <TalleresResponseInterface>response.json())
            .catch(this.handleError);
    }


    deleteTalleres = (id: string): Observable<TalleresInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}deleteTalleres/${id}`;
        return this._http.delete(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <TalleresInterface>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
