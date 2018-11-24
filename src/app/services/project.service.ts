import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { Project } from '../models/project';
import { catchError } from 'rxjs/operators';

// Esto hace que solo cree una instancia del servicio
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = 'http://localhost:3700/api/project'; //Es la URL donde se despliega el backend
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to console
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  createV2(project): Observable<Project> {
    const params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    /* Pipe lo que hace es permitir hacer operaciones sobre el objeto sin que este se modifique, en este caso
    permite que el metodo catchError controle si ha habido un error en el proceso sin alterar el objeto que devuelve el servicio */

    return this._https.post<Project>(this.url, params, { headers: headers }).pipe(
      catchError(this.handleError<Project>('create'))); // Peticion post con los datos
  }

  getProject(projectId): Observable<Project> {
    return this._https.get<Project>(this.url + '/' + projectId).pipe(
      catchError(this.handleError<Project>('getProject'))); // Se le pasa un id concreto para obtener un objeto
  }

  getProjects(): Observable<any> {
    return this._https.get<Project[]>(this.url + 's').pipe(
      catchError(this.handleError('getProjects'))); // Peticion a la url que devuelve el listado
  }

  updateProject(project): Observable<any> {
    const params = JSON.stringify(project); // Para convertir el objeto Project a json que es lo que entiende el backend
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda

    return this._https.put<Project>(this.url, params, { headers: headers }).pipe(
      catchError(this.handleError<Project>('getProjects')));; // Peticion post con los datos
  }

  deleteProject(projectId): Observable<any> {
    return this._https.delete<Project>(this.url + '/' + projectId).pipe(
      catchError(this.handleError<Project>('getProjects')));;
  }
}
