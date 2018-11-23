import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContractService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = 'http://localhost:3700/api/contract'; // Es la URL donde se despliega el backend
  }

  create(contract): Observable<any> {
    const params = JSON.stringify(contract); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.post(this.url, params, {headers: headers}); // Peticion post con los datos
  }

  getContract(projectId): Observable<any> {
    return this._https.get(this.url + '/' + projectId); // Se le pasa un id concreto para obtener un objeto
  }

  getContracts(): Observable<any> {
    return this._https.get(this.url + 's'); // Peticion a la url que devuelve el listado
  }

  updateContract(contract): Observable<any> {
    const params = JSON.stringify(contract); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.put(this.url, params, {headers: headers}); // Peticion post con los datos
  }

  deleteContract(projectId): Observable<any> {
    return this._https.delete(this.url + '/' + projectId);
  }
}
