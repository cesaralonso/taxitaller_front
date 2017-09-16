import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AuthLocalstorage } from './../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../../../app/app.constants';
import { PermisosInterface } from './permisos-table/permisos.interface';
import { PermisosResponseInterface } from './permisos-table/permisos-response.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisosService {

    private actionUrl: string;
    private headers: Headers;


    constructor(
        private _http: Http, 
        private _configuration: Configuration, 
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage 
    ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }


    addPermisos = (permiso: PermisosInterface): Observable<PermisosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}postPermiso`;
        const toAdd = JSON.stringify(permiso);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editPermisos = ( data ): Observable<PermisosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}putPermiso/${data.data.idpermiso}`;
        const toAdd = JSON.stringify(data);
        return this._http.put(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getPermisos = (id: number): Observable<PermisosInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getPermiso/${id}`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => {<PermisosInterface>response.json()})
            .catch(this.handleError);
    }

    getAllPermisos = (): Observable<PermisosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getPermisos`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface>response.json())
            .catch(this.handleError);
    }


    deletePermisos = (id: string): Observable<PermisosInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}deletePermiso/${id}`;
        return this._http.delete(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <PermisosInterface>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
