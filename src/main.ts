import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, 
  {
    providers: [
      appRoutingProviders,
      provideHttpClient(),
      importProvidersFrom(
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ),
      AuthService
    ]
  })
  .catch((err) => console.error(err));
