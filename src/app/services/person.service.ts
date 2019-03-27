import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HandleError } from '../components/shared/handleError';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = environment.serverUrl + 'api/person';
  }

  create(person): Observable<any> {
    const params = JSON.stringify(person);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<any>(this.url, params, {headers: headers, observe: 'response'})
    .pipe(tap(HandleError.handleError));
  }

  getPerson(personId): Observable<any> {
    return this._http.get<Person>(this.url + '/' + personId, {observe: 'response'})
    .pipe(tap(HandleError.handleError))
  }

  getAll(): Observable<any> {
    return this._http.get<Person[]>(this.url + 's', { observe: 'response' })
    .pipe(tap(HandleError.handleError));
  }

  updatePerson(person): Observable<any> {
    const params = JSON.stringify(person); 
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    return this._http.put<Person>(this.url + '/' + person._id, params, { headers: headers, observe: 'response' })
    .pipe(tap(HandleError.handleError));
  }

  deletePerson(personId): Observable<any> {
    return this._http.delete<Person>(this.url + '/' + personId, { observe: 'response' })
    .pipe(tap(HandleError.handleError));;
  }
}
