import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Publication } from '../models/publication'
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { parse } from 'fast-xml-parser'
import { HandleError } from '../components/shared/handleError';

@Injectable({
  providedIn: 'root'
})
export class ScopusService {
  //https://www.youtube.com/watch?v=zq48aSVEwbQ
  private url = "/scopus"
  constructor(private _http: HttpClient) { }

  getPubs(latestDate, start = 0, count = 25, users = []): Promise<Publication[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Para decirle al backend lo que se le manda
    let pubs;
    let total;
    return new Promise<Publication[]>(resolve => {
      return this._http.post(this.url, { authors: users, date: latestDate, start: start, count: count }, { headers: headers, observe: 'response' })
        .pipe(tap(HandleError.handleError)).subscribe((data) => {
          let results = data["body"]
          let publications = results["search-results"]["entry"]
          pubs = publications.map((e) => Publication.parse(e))
          total = data.body["search-results"]["opensearch:totalResults"]
          let insideWhile = pubs.length + start < total
          if (!insideWhile) resolve(pubs);
          else
            if (pubs.length + start < total) {
              return resolve(this.getPubs(latestDate, pubs.length, (total - pubs.length) % 25, users).then((morePubs) => pubs.concat(morePubs)))
            }
        })
    })
  }
}