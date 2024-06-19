import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.USERS.REGISTER, user);
  }

}