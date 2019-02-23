import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})
export class ScopusService {

  constructor(private _http: HttpClient) { }

  getAuthor(){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-ELS-APIKEY': 'f7f75a8f1e48b03f87da28cc8eb055b7'
    })}
    return this._http.get("https://api.elsevier.com/content/author?author_id=15021461000",httpOptions)
  }
}
