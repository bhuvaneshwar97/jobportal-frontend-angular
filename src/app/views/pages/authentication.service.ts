import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:3005";
  validateLogin(payload:any){
    return this.http.post(this.url+"/users/login", payload)
  }
}
