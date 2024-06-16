import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadService } from '../services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  isLoading = false;
  uploadFileForm = new FormGroup({
    sendEmail: new FormControl(true, Validators.required),
    file: new FormControl<File | null>(null, [Validators.required, this.fileValidator])
  });

  constructor(private uploadService: UploadService, private router: Router) {}

  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList = element.files;
    if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension !== 'xlsx') {
            alert('Only .xlsx files are allowed!');
            element.value = ''; // Correctly reset the input only if file is not .xlsx
        } else {
            this.uploadFileForm.get('file')!.setValue(file);
        }
    } else {
        // If no file is selected (e.g., if the user cancels the file picker), you may reset the form control
        this.uploadFileForm.get('file')!.setValue(null);
    }
}

  fileValidator(control: FormControl): { [key: string]: any } | null {
    const file = control.value as File | null;
    if (file?.name) { // Ensure file and file.name are defined
        const parts = file.name.split('.');
        const extension = parts.pop();
        if (extension && extension.toLowerCase() !== 'xlsx') {
            return { wrongFileType: true };
        }
    }
    return null;
}

  upload() {
    if (this.uploadFileForm.invalid) {
      alert('Please fix the errors before uploading.');
      return;
    }
    this.isLoading = true;
    const file = this.uploadFileForm.get('file')!.value as File;
    const sendEmail = this.uploadFileForm.get('sendEmail')!.value as boolean;
    console.log(file);
    console.log(sendEmail);
    this.uploadService.uploadfile(file, sendEmail).subscribe({
      next: () => {
        alert("Uploaded successfully!");
        this.isLoading = false;
      },
      error: (error) => {
        alert("Upload failed: " + error);
        this.isLoading = false;
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}