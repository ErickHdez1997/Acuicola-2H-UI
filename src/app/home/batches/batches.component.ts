import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../common/spinner.service';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css'
})
export class BatchesComponent {

  createBatchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private batchService: BatchService,
    private spinnerService: SpinnerService
  ) {
    this.createBatchForm = this.formBuilder.group({
      fishTankId: ['', Validators.required],
      numberOfFish: ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  createBatch() {
    this.spinnerService.showSpinner();
    if (this.createBatchForm.valid) {
      console.log("The create Batch Form")
      console.log(this.createBatchForm.value)
      this.batchService.createBatch(this.createBatchForm.value).subscribe({
        next: response => {
        },
        error: (error: any) => {
          this.spinnerService.hideSpinner();
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        }
      })
    }
  }

}
