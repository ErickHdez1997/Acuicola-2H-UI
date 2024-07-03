import { Injectable } from '@angular/core';
import { Batch } from '../Interfaces/batch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TankMeasurement } from '../Interfaces/tank-measurement';
import { CreateBatchDto } from '../Interfaces/create-batch-dto';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

   private apiUrl = 'http://localhost:8080/batches';  // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  getActiveBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.apiUrl}/active`);
  }

  getBatchById(batchId: number): Observable<Batch> {
    return this.http.get<Batch>(`${this.apiUrl}/${batchId}`);
  }

  createBatch(request: CreateBatchDto): Observable<Batch> {
    return this.http.post<Batch>(`${this.apiUrl}/create`, request);
  }

  createTestData(): Observable<TankMeasurement[]> {
    return this.http.get<TankMeasurement[]>(`http://localhost:8080/tank/createTestTank`);
  }
}
