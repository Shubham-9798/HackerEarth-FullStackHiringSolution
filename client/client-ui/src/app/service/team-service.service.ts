import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http'
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HandleError } from './error.handler';
import { AppUrl } from './../utility/server.routes';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
  serverUrl:string = AppUrl()
  constructor(private _http: HttpClient) { }

  getScoreCard() {
    return this._http.get(this.serverUrl+"getScoreCard")
  }

  addTeam() {
    return this._http.post(this.serverUrl+"addTeam", "")
  }

  postMatchWinner(data) {
    console.log(data);
    
    return this._http.post(this.serverUrl+"matchWinner", data)
  }

}
