import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import { UserProfileInfoDto } from '../Interfaces/user-profile-info-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId!: number;

  constructor(private http: HttpClient) { }

  fetchUserProfile(userId: number): Observable<UserProfileInfoDto> {
    return this.http.post<UserProfileInfoDto>(API_ENDPOINTS.USERS.FETCH_USER_PROFILE, userId);
  }
  
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.USERS.REGISTER, user);
  }

  saveUserNotes(userProfile: UserProfileInfoDto): Observable<UserProfileInfoDto> {
    return this.http.post<UserProfileInfoDto>(API_ENDPOINTS.USERS.SAVE_NOTES, userProfile);
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }
  
  getUserId(): number {
    return this.userId;
  }
}