import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BatchService } from '../../services/batch.service';
import { TankMeasurement } from '../../Interfaces/tank-measurement';
import { Batch } from '../../Interfaces/batch';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

  activeBatches: Batch[] = [];
  selectedBatch: Batch | null = null;
  showBatchDetails: boolean = false;

  displayedColumns: string[] = ['id', 'oxygen', 'temperature', 'ph', 'salinity', 'nitrate', 'nitrite', 
    'ammonia', 'turbine', 'alkalinity', 'deaths','date'];
  dataSource: MatTableDataSource<TankMeasurement>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private batchService: BatchService
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
    if (this.selectedBatch?.id === batchId) {
      this.showBatchDetails = false;
      this.selectedBatch = null;
      return;
    }
    this.batchService.getBatchById(batchId).subscribe((batch: Batch | null) => {
      this.showBatchDetails = true;
      console.log(batch)
      this.selectedBatch = batch;
      this.dataSource = new MatTableDataSource(this.selectedBatch?.measurements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

// Paginator used for sorting
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
