import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-measurement-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-measurement-dialog.component.html',
  styleUrl: './add-measurement-dialog.component.css'
})
export class AddMeasurementDialogComponent {
  measurementForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddMeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fishTankId: number, batchId: number },
    private fb: FormBuilder
  ) {
    this.measurementForm = this.fb.group({
      oxygen: ['', [Validators.required, Validators.min(0)]],
      temperature: ['', [Validators.required, Validators.min(0)]],
      ph: ['', [Validators.required, Validators.min(0), Validators.max(14)]],
      salinity: ['', [Validators.required, Validators.min(0)]],
      nitrate: ['', [Validators.required, Validators.min(0)]],
      nitrite: ['', [Validators.required, Validators.min(0)]],
      ammonia: ['', [Validators.required, Validators.min(0)]],
      turbine: ['', [Validators.required, Validators.min(0)]],
      alkalinity: ['', [Validators.required, Validators.min(0)]],
      deaths: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.measurementForm.valid) {
      const newMeasurement = {
        ...this.measurementForm.value,
        fishTankId: this.data.fishTankId,
        batchId: this.data.batchId,
        date: new Date().toISOString()
      };
      this.dialogRef.close(newMeasurement);
    }
  }
}