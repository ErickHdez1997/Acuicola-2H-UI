import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {} from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { UploadComponent } from "./upload/upload.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        LoginComponent,
        
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
        UploadComponent
    ]
})
export class AppComponent {
  title = 'Acuicola 2H';
}
