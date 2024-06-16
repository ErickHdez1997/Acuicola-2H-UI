import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

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
        RouterModule,
        UploadComponent
    ]
})
export class AppComponent {
  title = 'Acuicola 2H';
}
