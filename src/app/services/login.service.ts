import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: any, password: any) {
    return this.http.get('http//localhost:8080/cust/'+username+'/'+password); 
  }

}
