import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Publication } from '../models/publication'
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.serverUrl + '/api/publication';
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

  create(publication: Publication): Observable<Publication> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda
    /* Pipe lo que hace es permitir hacer operaciones sobre el objeto sin que este se modifique, en este caso
    permite que el metodo catchError controle si ha habido un error en el proceso sin alterar el objeto que devuelve el servicio */

    return this._http.post<Publication>(this.url, params, { headers: headers })
    .pipe(catchError(this.handleError));
  }

  list(limit=25, offset=0): Observable<Publication[]>{
    return this._http.get<Publication[]>(this.url + "s?limit="+limit+"&offset="+offset)
    .pipe(catchError(this.handleError))
  }

  saveAll(publications: Publication[]): Observable<Publication[]> {
    return this._http.post<Publication[]>(this.url+"/all",publications).pipe(catchError(this.handleError));
  }
}
