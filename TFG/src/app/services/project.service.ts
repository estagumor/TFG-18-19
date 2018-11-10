import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = 'http://localhost:3700/api/'; //Es la URL donde se despliega el backend
  }

  createV2(project): Observable<any> {
    let params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.post(this.url + 'save-project', params, {headers: headers}); // Peticion post con los datos
  }

  getProject(projectId): Observable<any> {
    return this._https.get(this.url + 'project/' + '5bd8b9a9d93f9026f75a0b8b'); // Se le pasa un id concreto para obtener un objeto
  }

  getProjects(): Observable<any> {
    return this._https.get(this.url + 'projects'); // Peticion a la url que devuelve el listado
  }
}
