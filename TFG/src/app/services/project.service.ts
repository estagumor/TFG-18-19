import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = 'http://localhost:3700/api/';
  }

  createProject(project): Observable<any> {
    return this._https.post(this.url, project);
  }

  createV2(project): Observable<any> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._https.post(this.url + 'save-project', params, {headers: headers});
  }

  getProject(projectId): Observable<any> {
    return this._https.get(this.url + 'project/' + '5bd8b9a9d93f9026f75a0b8b');
  }

  getProjects(): Observable<any> {
    return this._https.get(this.url + 'projects');
  }
}
