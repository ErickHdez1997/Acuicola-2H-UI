import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BatchService } from '../../services/batch.service';
import { MeasurementId, TankMeasurement } from '../../Interfaces/tank-measurement';
import { Batch } from '../../Interfaces/batch';
import { TankService } from '../../services/tank.service';
import { FishTank } from '../../Interfaces/fish-tank';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { SelectionModel } from '@angular/cdk/collections';
import { MeasurementService } from '../../services/measurement.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddMeasurementDialogComponent } from './add-measurement-dialog/add-measurement-dialog.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MatDialogModule 
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

  allFishTanks: FishTank[] = [];
  selectedFishTank: FishTank | null = null;
  notesForSelectedTank: string = '';

  activeBatches: Batch[] = [];
  selectedBatch: Batch | null = null;
  totalFishDeadForSelectedBatch: number = 0;

  showBatchSummary: boolean = false;
  showBatchDetails: boolean = false;

  displayedColumns: string[] = ['id', 'oxygen', 'temperature', 'ph', 'salinity', 'nitrate', 'nitrite', 
    'ammonia', 'turbine', 'alkalinity', 'deaths','date', 'select'];

  selection = new SelectionModel<TankMeasurement>(true, []);
  dataSource: MatTableDataSource<TankMeasurement> = new MatTableDataSource();
  @ViewChild(MatTable) table!: MatTable<TankMeasurement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private batchService: BatchService,
    private tankService: TankService,
    private measurementService: MeasurementService,
    private dialog: MatDialog
  ) { }

  editor!: Editor;
  html = '';

  ngOnInit(): void {
    this.tankService.getAllTanks().subscribe((fishTanks: FishTank[]) => {
      console.log(fishTanks)
      this.allFishTanks = fishTanks;
    });
    this.batchService.getActiveBatches().subscribe((batches: Batch[]) => {
      console.log(batches)
      this.activeBatches = batches;
    });
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  selectBatch(fishTank: FishTank): void {
    this.selectedFishTank = fishTank;
    if (this.selectedBatch?.id === fishTank.activeBatchId) {
      this.notesForSelectedTank = '';
      this.showBatchSummary = false
      this.showBatchDetails = false;
      this.selectedBatch = null;
      return;
    }
    this.totalFishDeadForSelectedBatch = 0;
    this.notesForSelectedTank = fishTank.tankNotes;
    this.batchService.getBatchById(fishTank.activeBatchId).subscribe((batch: Batch | null) => {
      this.showBatchSummary = true;
      this.showBatchDetails = true;
      console.log(batch)
      batch?.measurements.forEach(measurement => {
        this.totalFishDeadForSelectedBatch += measurement.deaths;
      })
      this.selectedBatch = batch;
      this.dataSource = new MatTableDataSource(this.selectedBatch?.measurements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'id', start: 'desc', disableClear: true });
      this.sort.sortChange.subscribe(() => {
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
          switch (sortHeaderId) {
            case 'id': return data.id.measurementId;
            case 'oxygen': return data.oxygen;
            case 'temperature': return data.temperature;
            case 'ph': return data.ph;
            case 'salinity': return data.salinity;
            case 'nitrate': return data.nitrate;
            case 'nitrite': return data.nitrite;
            case 'ammonia': return data.ammonia;
            case 'turbine': return data.turbine;
            case 'alkalinity': return data.alkalinity;
            case 'deaths': return data.deaths;
            case 'date': return data.date;
            default: return '';
          }
        };
      });
      this.dataSource.data = this.dataSource.data.sort((a, b) => (a.id.measurementId > b.id.measurementId ? -1 : 1));
    });
  }

  addData() {
    const dialogRef = this.dialog.open(AddMeasurementDialogComponent, {
      width: '400px',
      data: { fishTankId: this.selectedFishTank?.id, batchId: this.selectedBatch?.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.measurementService.addMeasurement(result).subscribe(
          (newMeasurement: TankMeasurement) => {
            this.dataSource.data = [newMeasurement, ...this.dataSource.data];
            this.table.renderRows();
            this.totalFishDeadForSelectedBatch += newMeasurement.deaths;
          },
          error => {
            console.error('Error adding measurement:', error);
            // Handle error (e.g., show error message to user)
          }
        );
      }
    });
  }

  removeData() {
    //implement 
    // Ask if you are sure!!!
    const selectedRows = this.selection.selected;
    //Clear selections!!!!
    
    // Log each selected row as a readable JSON string
    selectedRows.forEach(row => {
      console.log('Selected Row:', JSON.stringify(row, null, 2));
    });
    this.measurementService.deleteSelectedMeasurements(selectedRows).subscribe((measurements: TankMeasurement[] | null) => {
      console.log("New measurements"+measurements?.length);
      if (measurements) {
        this.dataSource = new MatTableDataSource(measurements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sort({ id: 'id', start: 'desc', disableClear: true });
        this.sort.sortChange.subscribe(() => {
          this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
            switch (sortHeaderId) {
              case 'id': return data.id.measurementId;
              case 'oxygen': return data.oxygen;
              case 'temperature': return data.temperature;
              case 'ph': return data.ph;
              case 'salinity': return data.salinity;
              case 'nitrate': return data.nitrate;
              case 'nitrite': return data.nitrite;
              case 'ammonia': return data.ammonia;
              case 'turbine': return data.turbine;
              case 'alkalinity': return data.alkalinity;
              case 'deaths': return data.deaths;
              case 'date': return data.date;
              default: return '';
            }
          };
        });
        this.dataSource.data = this.dataSource.data.sort((a, b) => (a.id.measurementId > b.id.measurementId ? -1 : 1));
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TankMeasurement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id.measurementId + 1}`;
  }

  saveNotes(notes: string): void {
    if (this.selectedFishTank) {
      this.selectedFishTank.tankNotes = notes;
      this.tankService.saveNotes(this.selectedFishTank).subscribe((response: FishTank | null) => {
        //to do - implement a screen message
        console.log('notes saves successfully: ', response);
      });
    }
  }

  // Text Box Configuration
  onEditorContentChange(content: string): void {
    this.notesForSelectedTank = content;
  }

}
