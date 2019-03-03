import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import { Project } from '../models/project';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
  };

  createV2(project): Observable<Project> {
    const params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    /* Pipe lo que hace es permitir hacer operaciones sobre el objeto sin que este se modifique, en este caso
    permite que el metodo catchError controle si ha habido un error en el proceso sin alterar el objeto que devuelve el servicio */

    return this._https.post<Project>(this.url, params, { headers: headers }).pipe(
      catchError(this.handleError)); // Peticion post con los datos
  }

  getProject(projectId): Observable<Project> {
    return this._https.get<Project>(this.url + '/' + projectId).pipe(
      catchError(this.handleError)); // Se le pasa un id concreto para obtener un objeto
  }

  findByTitle(title): Observable<Project> {
    return this._https.get<Project>(this.url + '/title/' + title).pipe(
      catchError(this.handleError)); // Se le pasa un id concreto para obtener un objeto
  }

  findByReference(reference): Observable<Project> {
    return this._https.get<Project>(this.url + '/reference/' + reference).pipe(
      catchError(this.handleError)); // Se le pasa un id concreto para obtener un objeto
  }

  getProjects(limit=25, offset=0): Observable<any> {
    return this._https.get<Project[]>(this.url + 's?limit='+limit+'offset='+offset).pipe(catchError(this.handleError)); // Peticion a la url que devuelve el listado
  }

  updateProject(project): Observable<any> {
    const params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.put<Project>(this.url, params, { headers: headers }).pipe(
      catchError(this.handleError));; // Peticion post con los datos
  }

  deleteProject(projectId): Observable<any> {
    return this._https.delete<Project>(this.url + '/' + projectId).pipe(
      catchError(this.handleError));;
  }
}
