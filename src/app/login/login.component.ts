import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: any = {};
  getData: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginService, private router: Router) {
  }

  login() {
    //Call API
    if(this.loginForm.invalid) return;

    alert('Calling backend to login');

    const username = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.login(username, password).subscribe((result: boolean) => {
      this.getData = result;
    })

    if(this.getData) {
      this.router.navigate(["/home/"]);
    } else {
      alert("Invalid username/password");
    }
  }
}
