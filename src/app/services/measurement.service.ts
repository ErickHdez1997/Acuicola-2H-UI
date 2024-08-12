import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TankMeasurement } from '../Interfaces/tank-measurement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private apiUrl = 'http://localhost:8080/api/measurement';

  constructor(private http: HttpClient) { }

  addMeasurement(tankMeasurement: TankMeasurement): Observable<TankMeasurement> {
    return this.http.post<TankMeasurement>(`${this.apiUrl}/addMeasurement`, tankMeasurement);
  }

  deleteSelectedMeasurements(tankMeasurements: TankMeasurement[]): Observable<TankMeasurement[]> {
    return this.http.post<TankMeasurement[]>(`${this.apiUrl}/deleteMeasurements`, tankMeasurements);
  }
}
