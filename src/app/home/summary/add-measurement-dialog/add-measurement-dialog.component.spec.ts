import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeasurementDialogComponent } from './add-measurement-dialog.component';

describe('AddMeasurementDialogComponent', () => {
  let component: AddMeasurementDialogComponent;
  let fixture: ComponentFixture<AddMeasurementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMeasurementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeasurementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
