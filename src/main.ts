import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes, { appRoutingProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';

bootstrapApplication(AppComponent, 
  {
    providers: [
      appRoutingProviders,
      provideHttpClient(),
      AuthService
    ]
  })
  .catch((err) => console.error(err));
