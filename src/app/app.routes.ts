import { Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './home/upload/upload.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './register/register.component';
import { SummaryComponent } from './home/summary/summary.component';
import { BatchesComponent } from './home/batches/batches.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },{
        path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
          { path: 'batches', component: BatchesComponent, canActivate: [AuthGuard] },
          { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
          { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }
        ]
      },
    // { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

export default routes;

export const appRoutingProviders = [
    provideRouter(routes)
  ];