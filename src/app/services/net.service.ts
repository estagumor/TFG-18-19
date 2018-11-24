import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = environment.serverUrl + '/api/net'; // Es la URL donde se despliega el backend
  }

  create(Net): Observable<any> {
    const params = JSON.stringify(Net); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.post(this.url, params, {headers: headers}); // Peticion post con los datos
  }

  getNet(projectId): Observable<any> {
    return this._https.get(this.url + '/' + projectId); // Se le pasa un id concreto para obtener un objeto
  }

  getNets(): Observable<any> {
    return this._https.get(this.url + 's'); // Peticion a la url que devuelve el listado
  }

  updateNet(Net): Observable<any> {
    const params = JSON.stringify(Net); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.put(this.url, params, {headers: headers}); // Peticion post con los datos
  }

  deleteNet(projectId): Observable<any> {
    return this._https.delete(this.url + '/' + projectId);
  }
}
