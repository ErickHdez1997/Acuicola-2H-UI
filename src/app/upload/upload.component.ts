import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  file: File = null as any;
 
  constructor(private uploadService: UploadService){
  
  }

  uploadFileForm = new FormGroup({
    numberOfLines: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  });
  
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.uploadFileForm.invalid) return;
    alert('Document is being processed!');
    console.log(this.uploadFileForm.value.numberOfLines);
    console.log(this.file);
    if (this.file) {
      this.uploadService.uploadfile(this.file).subscribe(resp => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }
}
