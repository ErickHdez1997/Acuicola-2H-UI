import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.USERS.LOGIN, credentials);
  }

  public set setAuthenticatedSubject(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  

  logout(): void {
    // this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // get isLoggedIn(): boolean {
  //   return this.isAuthenticated;
  // }
}
