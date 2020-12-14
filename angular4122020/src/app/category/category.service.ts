

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  addcategory(){
    let option = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let body = new URLSearchParams();
    body.set("name","angular");
    let url = "http://localhost:3000/product/add/list";
    return this.http.post(url, body.toString(),option);
  }
}
