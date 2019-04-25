import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Publication } from '../models/publication'
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { parse } from 'fast-xml-parser'

@Injectable({
  providedIn: 'root'
})
export class ScopusService {
  private url = "https://api.elsevier.com/content/search/scopus?query="
  private apiKey = "f7f75a8f1e48b03f87da28cc8eb055b7"
  private allPubs: Publication[] = []
  private users = ["15021461000","22333640600"]
  private startDateProject = new Date()

  constructor(private _http: HttpClient) { }

  getPubs(start = 0, count = 25): Observable<any>{
    let pubs
    let finalUrl = this.url
    this.users.forEach((n,index) => {
      finalUrl = finalUrl + "AU-ID("+n+")"
      if(index < this.users.length-1 )
      finalUrl = finalUrl + "%20OR%20"
    });
    finalUrl = finalUrl + "%20AND%20PUBYEAR%20%3E%20" + (this.startDateProject.getFullYear()-1) + "%20OR%20PUBYEAR%20%3D%20"+ (this.startDateProject.getFullYear()-1) + "&apiKey=" + this.apiKey+"&start=" + start + "&count=" + count
    return this._http.get("http://localhost:3700/api/fakeScopus", {responseType: "text"}).map((data) => {
      let results = parse(data)
      let publications = results["search-results"]["entry"] 
      pubs = publications.map((e) => Publication.parse(e))
      return pubs
  })}

}