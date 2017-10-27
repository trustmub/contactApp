import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SignupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupProvider {
  url;

  constructor(public http: Http) {
    console.log('Hello SignupProvider Provider');
    this.url = 'http://localhost:5001/api/users';
  }

  creatUser(username, password){
    let headers:Headers = new Headers;
    let data = {"username":username,"password":password};
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, JSON.stringify(data), {headers:headers}).map(res => res);
  }

}
