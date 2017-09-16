import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { LiquidacionesResponseInterface } from './liquidaciones-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { LiquidacionesInterface } from './liquidaciones.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LiquidacionesService {

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


    addLiquidaciones = (taller: LiquidacionesInterface): Observable<LiquidacionesResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}postLiquidacion`;
        const toAdd = JSON.stringify(taller);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editLiquidaciones = ( data ): Observable<LiquidacionesResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}putLiquidacion/${data.data.idtaller}`;
        const toAdd = JSON.stringify(data);
        return this._http.put(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getLiquidaciones = (id: number): Observable<LiquidacionesInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getLiquidaciones/${id}`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => {<LiquidacionesInterface>response.json()})
            .catch(this.handleError);
    }

    getAllLiquidaciones = (): Observable<LiquidacionesResponseInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}getLiquidaciones`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <LiquidacionesResponseInterface>response.json())
            .catch(this.handleError);
    }


    deleteLiquidaciones = (id: string): Observable<LiquidacionesInterface> => {
        this.actionUrl = `${this._configuration.serverWithApiUrl}deleteLiquidacion/${id}`;
        return this._http.delete(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <LiquidacionesInterface>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
