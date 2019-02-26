import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Publication } from '../models/publication'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScopusService {
  private url = "https://api.elsevier.com/content/search/scopus?query="
  private apiKey = "f7f75a8f1e48b03f87da28cc8eb055b7"

  constructor(private _http: HttpClient) { }

  getAuthor(): Observable<Publication[]>{
    return this.recursiveSearch(this.url + "AU-ID(15021461000)" + "&apiKey=" + this.apiKey)
  }

  recursiveSearch(url): Observable<Publication[]>{
    let pubs = []
    let results: any;
    this._http.get(url).subscribe((data) => {
      results = data
      let publications = results["search-results"]["entry"] 
      pubs = publications.map((e) => Publication.parse(e))
      let next = results["search-results"]["link"][2]
      if(next["@ref"] == "next"){
        console.log("has next")
      }
      console.log(pubs)
    })
    return of(pubs)
  }
}
