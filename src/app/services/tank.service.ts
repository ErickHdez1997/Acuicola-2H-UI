import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FishTank } from '../Interfaces/fish-tank';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TankService {

  private apiUrl = 'http://localhost:8080/tank';

  constructor(private http: HttpClient) { }

  getAllTanks(): Observable<FishTank[]> {
    return this.http.get<FishTank[]>(`${this.apiUrl}/getAllTanks`);
  }

  saveNotes(fishTank: FishTank): Observable<FishTank> {
    console.log('fishTank: ', fishTank)
    return this.http.post<FishTank>(`${this.apiUrl}/saveNotes`, fishTank);
  }
}
