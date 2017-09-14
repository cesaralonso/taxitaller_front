import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  // server: string = 'http://localhost/taxytaller_api/';
  server: string = 'http://aidihosting.com/proyectos/taxytaller_api/';
  apiUrl: string = 'api/v1/';
  serverWithApiUrl = this.server + this.apiUrl;
}
