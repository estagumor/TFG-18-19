import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PeticionesService {
  public url: string;
  constructor(
    private _https: HttpClient
  ) {
    this.url = 'https://reqres.in/';
  }

  getUser(userId): Observable<any> {
    return this._https.get(this.url + 'api/users/' + userId);
  }
}
