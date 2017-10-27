import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsProvider {
  baseURL;
  url;
  deleteUrl;
  addUrl;

  constructor(public http: Http) {
    console.log('Hello ContactsProvider Provider');

    this.baseURL = 'http://localhost:5001';
    this.url = this.baseURL + '/api/all/contacts';
    this.deleteUrl = this.baseURL + '/api/delete/';
    this.addUrl = this.baseURL + '/api/contacts';
    // this.url = 'http://a93a3188.ngrok.io/api/all/contacts';
    
  }

  getContacts(storedToken){
    let placeholder:string = 'password';    
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(storedToken + ':' + placeholder));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url, {headers: headers}).map(res => res);

  }

  addContact(storedToken, name, phone, email){
    let headers:Headers = new Headers;
    let placeholder:string = 'password';
    let data = {"name":name,"phone":phone,"email":email};
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(storedToken +':'+ placeholder));
    return this.http.post(this.addUrl, JSON.stringify(data), {headers:headers}).map(res => res);
  }

  deleteContact(storedToken, id){
    let placeholder:string = 'password';    
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(storedToken + ':' + placeholder));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.deleteUrl + id, {headers:headers}).map(res => res);
  }

}
