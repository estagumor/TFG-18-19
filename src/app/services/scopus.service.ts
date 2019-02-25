import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})
export class ScopusService {
  private url = "https://api.elsevier.com/content/search/scopus?query="
  private apiKey = "b39c7f016471a774702ff69c180a8bc7"

  constructor(private _http: HttpClient) { }

  getAuthor(): Observable<String>{
    return this._http.get<String>(this.url + "AU-ID(15021461000)" + "&apiKey=" + this.apiKey)
  }
}
