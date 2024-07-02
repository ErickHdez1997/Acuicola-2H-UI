import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { UserService } from '../services/user.service';
import { SpinnerService } from '../common/spinner.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private userService: UserService,
    private spinnerService: SpinnerService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: this.passwordMatchValidator,
    }
  );
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch : true};
  }

  isValid(event: any) {
    console.log(this.registerForm.valid);
  }

  register() {
    if (this.registerForm.valid) {
      this.spinnerService.showSpinner();
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: response => {
          console.log('User registered successfully', response);
        },
        error: error => {
          console.error('Error registering user', error);
          this.spinnerService.hideSpinner();
        },
        complete: () => {
          console.log('Registration process completed');
          this.router.navigate(['/login']);
          this.spinnerService.hideSpinner();
        }
      });
    }
  }

  login() {
    this.spinnerService.showSpinner();
    this.router.navigate(['/login']);
    this.spinnerService.hideSpinner();
  }
}
