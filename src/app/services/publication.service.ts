import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Publication } from '../models/publication'
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError } from '../components/shared/handleError'
import { Project } from '../models/project';

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

  create(publication: Publication): Observable<any> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda
    /* Pipe lo que hace es permitir hacer operaciones sobre el objeto sin que este se modifique, en este caso
    permite que el metodo catchError controle si ha habido un error en el proceso sin alterar el objeto que devuelve el servicio */

    return this._http.post<Publication>(this.url, params, { headers: headers , observe: 'response' })
    .pipe(tap(HandleError.handleError));
  }

  list(limit=25, offset=0): Observable<any>{
    return this._http.get<Publication[]>(this.url + "s?limit="+limit+"&offset="+offset, { observe: 'response' })
    .pipe(tap(HandleError.handleError));
  }

  saveAll(publications: Publication[], projects: Project[]): Observable<any> {
    return this._http.post<Publication[]>(this.url+"/filter",{pubs: publications, projects: projects},{observe: 'response'})
    .pipe(tap(HandleError.handleError));
  }

  // filterNewPublications(publications: Publication[]): Observable<any> {
  //   return this._http.post<Publication[]>(this.url+"/filter",publications, { observe: 'response' })
  //   .pipe(tap(HandleError.handleError))
  // }

  filterByProject(id: String): Observable<any> {
    return this._http.get<Publication[]>(this.url+"/project/"+id, { observe: 'response' })
    .pipe(tap(HandleError.handleError))
  }

  sendExcel(tipo: string, excel: string | ArrayBuffer, name: string){
    return this._http.post<any>(this.url +"/excel", {tipo: tipo, excel: excel, name: name}, {observe: "response"})
    .pipe(tap(HandleError.handleError))
  }
}
