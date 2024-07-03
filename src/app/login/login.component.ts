import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../common/spinner.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  loginError: boolean = false;
  errorMessage = '';

  hidePassword = true;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  model: any = {};
  getData: boolean = false;

  login() {
    this.spinnerService.showSpinner();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          localStorage.setItem('token', response.token);
          this.authService.setAuthenticatedSubject = true;
          
        },
        error: (error: any) => {
          console.error('Error authenticating user', error);
          this.loginError = true;
          this.errorMessage = 'Invalid Credentials! Please try again'
          this.spinnerService.hideSpinner();
        },
        complete: () => {
          this.router.navigate(['/home']);
          this.spinnerService.hideSpinner();
        }
      });
    }
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
