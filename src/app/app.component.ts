import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  template: `
  <main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/32px-Fish.png" alt="logo" aria-hidden="true">
    </header>
    <section class="content">
      <app-login></app-login>
    </section>
  </main>
`, 
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Acuicola-2H-UI';
}
