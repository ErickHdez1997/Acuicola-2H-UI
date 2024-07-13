import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BatchService } from '../../services/batch.service';
import { TankMeasurement } from '../../Interfaces/tank-measurement';
import { Batch } from '../../Interfaces/batch';
import { TankService } from '../../services/tank.service';
import { FishTank } from '../../Interfaces/fish-tank';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    NgxEditorModule 
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
    'ammonia', 'turbine', 'alkalinity', 'deaths','date'];

  dataSource: MatTableDataSource<TankMeasurement> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private batchService: BatchService,
    private tankService: TankService
  ) { 
  }

  editor!: Editor;
  html = '';
  // toolbar: Toolbar = [
  //   ['bold', 'italic'],
  //   ['underline', 'strike'],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  // ];

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
