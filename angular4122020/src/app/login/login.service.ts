import { Injectable } from '@angular/core';
//import http
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //khai báo http
  constructor(private http: HttpClient) { }
  option = {
    headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
  }
  svlogin(username,password){
  let body = new URLSearchParams();
  body.set("password",password);
  body.set("username",username);
  let url = "http://localhost:3000/api/user/login";
  return this.http.post(url, body.toString(),this.option);
  }
}
