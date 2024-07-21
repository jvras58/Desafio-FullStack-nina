import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposAgressaoComponent } from './tipos-agressao.component';

describe('TiposAgressaoComponent', () => {
  let component: TiposAgressaoComponent;
  let fixture: ComponentFixture<TiposAgressaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposAgressaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposAgressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
