import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class InvestigationProjectService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = 'http://localhost:3700/api/investigationProject'; // Es la URL donde se despliega el backend
  }

  create(investigationProject): Observable<any> {
    const params = JSON.stringify(investigationProject); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.post(this.url, params, {headers: headers}); // Peticion post con los datos
  }

  getInvestigationProject(projectId): Observable<any> {
    return this._https.get(this.url + '/' + projectId); // Se le pasa un id concreto para obtener un objeto
  }

  getInvestigationProjects(): Observable<any> {
    return this._https.get(this.url + 's'); // Peticion a la url que devuelve el listado
  }

  updateInvestigationProject(investigationProject): Observable<any> {
    const params = JSON.stringify(investigationProject); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.put(this.url, params, {headers: headers}); // Peticion post con los datos
  }

  deleteInvestigationProject(projectId): Observable<any> {
    return this._https.delete(this.url + '/' + projectId);
  }
}
