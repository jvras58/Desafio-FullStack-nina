import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeRangeChartComponent } from './age-range-chart.component';

describe('AgeRangeChartComponent', () => {
  let component: AgeRangeChartComponent;
  let fixture: ComponentFixture<AgeRangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeRangeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeRangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
