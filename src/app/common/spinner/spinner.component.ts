import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';

import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.spinnerStatus.subscribe((status: boolean) => {
      this.showSpinner = status;
    });
  }

}
