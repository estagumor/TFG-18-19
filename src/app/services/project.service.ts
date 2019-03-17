import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import { Project } from '../models/project';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError } from '../components/shared/handleError'

// Esto hace que solo cree una instancia del servicio
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = environment.serverUrl + '/api/project'; //Es la URL donde se despliega el backend
  }

  createV2(project): Observable<any> {
    const params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    /* Pipe lo que hace es permitir hacer operaciones sobre el objeto sin que este se modifique, en este caso
    permite que el metodo catchError controle si ha habido un error en el proceso sin alterar el objeto que devuelve el servicio */

    return this._https.post<any>(this.url, params, { headers: headers, observe: 'response' })
    .pipe(tap(HandleError.handleError)); // Peticion post con los datos
  }

  getProject(projectId): Observable<any> {
    return this._https.get<Project>(this.url + '/' + projectId, { observe: 'response' })
    .pipe(tap(HandleError.handleError)); // Se le pasa un id concreto para obtener un objeto
  }

  findByTitle(title): Observable<any> {
    return this._https.get<Project>(this.url + '/title/' + title, { observe: 'response' })
    .pipe(tap(HandleError.handleError)); // Se le pasa un id concreto para obtener un objeto
  }

  findByReference(reference): Observable<any> {
    //console.log("Esta es la url del servicio: " + this.url + '/reference/' + reference);
    return this._https.get<Project>(this.url + '/reference/' + reference, { observe: 'response' })
    .pipe(tap(HandleError.handleError)); // Se le pasa un id concreto para obtener un objeto
  }

  getProjects(limit = 25, offset = 0): Observable<any> {
    return this._https.get<Project[]>(this.url + 's?limit=' + limit + 'offset=' + offset, { observe: 'response' })
    .pipe(tap(HandleError.handleError)); // Peticion a la url que devuelve el listado
  }

  updateProject(project): Observable<any> {
    const params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    // console.log("Hemos entrado al update de servicio " + params)
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda
    return this._https.put<Project>(this.url + '/' + project._id, params, { headers: headers, observe: 'response' })
    .pipe(tap(HandleError.handleError));; // Peticion post con los datos
  }

  deleteProject(projectId): Observable<any> {
    // console.log("Has entrado al delete del servicio. Id:" + projectId)
    ///project/:id
    return this._https.delete<Project>(this.url + '/' + projectId, { observe: 'response' })
    .pipe(tap(HandleError.handleError));;
  }
}
