import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UploadComponent } from "./home/upload/upload.component";
import { SpinnerComponent } from './common/spinner/spinner.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { BatchService } from './services/batch.service';
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        LoginComponent,
        RouterModule,
        UploadComponent,
        CommonModule,
        SpinnerComponent,
        HomeComponent,
        UploadComponent
    ]
})
export class AppComponent {
  title = 'Acuicola 2H';

  constructor(public authService: AuthService, private batchService: BatchService) {}

}
