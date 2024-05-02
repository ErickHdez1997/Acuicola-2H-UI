import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  
  public uploadfile(file: File, sendEmail: boolean) {
    let formParams = new FormData();
    formParams.append('file', file);
    formParams.append('sendEmail', String(sendEmail))
    return this.httpClient.post('http://localhost:8080/monitor/processFile', formParams)
  }
}
