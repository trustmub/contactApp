import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  url;

  constructor(public http: Http) {
    // console.log('Hello LoginProvider Provider');
    this.url = 'http://localhost:5001/api/token';
    // this.url = 'http://a93a3188.ngrok.io/api/token';
        
  }

  getToken(username_or_token, password){
    let headers:Headers = new Headers;
    // console.log('the Login Provide connected');
    headers.append('Authorization', 'Basic ' + btoa(username_or_token + ':' + password));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url, {headers: headers}).map(res => res);
  }

}
