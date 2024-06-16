import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-tank',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-tank.component.html',
  styleUrl: './create-tank.component.scss'
})
export class CreateTankComponent {

  createTankForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTankComponent>
  ) {
    this.createTankForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createTankForm.valid) {
      this.dialogRef.close(this.createTankForm.value.name);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
