import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { VehiculosInterface } from './vehiculos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VehiculosService {

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


    addVehiculos = (vehiculo: VehiculosInterface): Observable<VehiculosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}signup`;
        const toAdd = JSON.stringify(vehiculo);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editVehiculos = (vehiculo: VehiculosInterface): Observable<VehiculosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}putVehiculos/${vehiculo.idvehiculo}`;
        const toAdd = JSON.stringify(vehiculo);
        return this._http.put(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getVehiculos = (id: number): Observable<VehiculosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getVehiculos/${id}`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getAllVehiculos = (): Observable<VehiculosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getVehiculos`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }


    deleteVehiculos = (id: string): Observable<VehiculosResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}deleteVehiculos/${id}`;
        return this._http.delete(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <VehiculosResponseInterface>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
