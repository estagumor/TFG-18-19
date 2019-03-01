import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Publication } from '../models/publication'
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScopusService {
  private url = "https://api.elsevier.com/content/search/scopus?query="
  private apiKey = "f7f75a8f1e48b03f87da28cc8eb055b7"
  private allPubs: Publication[] = []

  constructor(private _http: HttpClient) { }

  getPubs(start = 0, count = 25): Observable<Publication[]>{
    let pubs
    return this._http.get<Publication[]>(this.url + "AU-ID(15021461000)" + "&apiKey=" + this.apiKey+"&start=" + start + "&count=" + count)
    .map((data) => {
      let results = data
      let publications = results["search-results"]["entry"] 
      pubs = publications.map((e) => Publication.parse(e))
      return pubs
    })
    return of(pubs)
  }

}
