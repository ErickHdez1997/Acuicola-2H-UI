import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { Provider, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './app/services/token.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, 
  {
    providers: [
      appRoutingProviders,
      provideHttpClient(),
      provideJwtHelper(),
      importProvidersFrom(
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ),
      AuthService, provideAnimationsAsync()
    ]
  })
  .catch((err) => console.error(err));

  function provideJwtHelper(): Provider[] {
    return [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService
    ];
  }

