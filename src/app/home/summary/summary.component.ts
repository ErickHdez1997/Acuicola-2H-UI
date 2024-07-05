import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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

  dataSource: MatTableDataSource<TankMeasurement>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private batchService: BatchService,
    private tankService: TankService
  ) {
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort;
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
      console.log(batches[0])
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
    });
  }

  saveNotes(notes: string): void {
    console.log('here 1')
    if (this.selectedFishTank) {
      console.log('here 2')
      this.selectedFishTank.tankNotes = notes;
      this.tankService.saveNotes(this.selectedFishTank).subscribe((response: FishTank | null) => {
        //to do - implement a screen message
        console.log('notes saves successfully: ', response);
      });
    }
  }

  // setRightDivHeight(): void {
  //   setTimeout(() => {
  //     const leftDiv = this.el.nativeElement.querySelector('#leftDiv');
  //     const rightDiv = this.el.nativeElement.querySelector('#rightDiv');
  //     const leftDivHeight = leftDiv.offsetHeight;
  //     this.renderer.setStyle(rightDiv, 'height', `${leftDivHeight}px`);
  //   }, 10);
  // }

  // Paginator used for sorting
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Text Box Configuration
  onEditorContentChange(content: string): void {
    this.notesForSelectedTank = content;
  }

}
