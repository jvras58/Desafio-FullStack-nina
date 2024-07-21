import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroChartComponent } from './genero-chart.component';

describe('AgeRangeChartComponent', () => {
  let component: GeneroChartComponent;
  let fixture: ComponentFixture<GeneroChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
