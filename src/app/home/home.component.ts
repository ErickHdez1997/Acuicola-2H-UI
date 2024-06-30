import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activeBatches: Batch[] = [];
  selectedBatch: Batch | null = null;

  displayedColumns: string[] = ['id', 'oxygen', 'temperature', 'ph', 'salinity', 'nitrate', 'nitrite', 
    'ammonia', 'turbine', 'alkalinity', 'deaths','date'];
  dataSource: MatTableDataSource<TankMeasurement>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private authService: AuthService, 
    private batchService: BatchService,
    private dialog: MatDialog, 
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort;
  }

  ngOnInit(): void {
    this.batchService.getActiveBatches().subscribe((batches: Batch[]) => {
      console.log(batches)
      console.log(batches[0])
      this.activeBatches = batches;
    });
  }

  selectBatch(batchId: number): void {
    this.batchService.getBatchById(batchId).subscribe((batch: Batch | null) => {
      console.log(batch)
      this.selectedBatch = batch;
      this.dataSource = new MatTableDataSource(this.selectedBatch?.measurements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  // Paginator used for sorting
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Will Remove
  createTestData() {
    this.batchService.createTestData().subscribe((tankMeasurements: TankMeasurement[] | null) => 
      console.log(tankMeasurements)
    )
  }
}
