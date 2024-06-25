import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CreateTankComponent } from '../create-tank/create-tank.component';
import { Router } from '@angular/router';
import { Batch } from '../Interfaces/batch';
import { BatchService } from '../services/batch.service';
import { CommonModule } from '@angular/common';
import { TankMeasurement } from '../Interfaces/tank-measurement';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activeBatches: Batch[] = [];
  selectedBatch: Batch | null = null;

  constructor(
    private authService: AuthService, 
    private batchService: BatchService,
    private dialog: MatDialog, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.batchService.getActiveBatches().subscribe((batches: Batch[]) => {
      console.log(batches)
      this.activeBatches = batches;
    });
  }

  selectBatch(batchId: number): void {
    this.batchService.getBatchById(batchId).subscribe((batch: Batch | null) => {
      console.log(batch)
      this.selectedBatch = batch;
    });
  }

  openCreateTankDialog() {
    const dialogRef = this.dialog.open(CreateTankComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Tank created with name: ${result}`);
      }
    });
  }

  navigateToUpload() {
    this.router.navigate(['/upload']);
  }

  logout() {
    this.authService.logout();
  }

  createTestData() {
    this.batchService.createTestData().subscribe((tankMeasurements: TankMeasurement[] | null) => 
      console.log(tankMeasurements)
    )}
}
