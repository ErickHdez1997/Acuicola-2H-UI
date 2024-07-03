import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BatchService } from '../services/batch.service';
import { CommonModule } from '@angular/common';
import { TankMeasurement } from '../Interfaces/tank-measurement';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private authService: AuthService, 
    private batchService: BatchService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  openManageBatchesComponent() {
    this.router.navigate(['batches'], {relativeTo: this.route});;
  }

  // To do
  openSummaryComponent() {
    this.router.navigate(['summary'], {relativeTo: this.route});
  }

  // To do
  openSettingsComponent() {
    return;
  }

  openUploadComponent() {
    this.router.navigate(['upload'], {relativeTo: this.route});
  }

  logout() {
    this.authService.logout();
  }

  // Will Remove
  createTestData() {
    this.batchService.createTestData().subscribe((tankMeasurements: TankMeasurement[] | null) => 
      console.log(tankMeasurements)
    )
  }
}
