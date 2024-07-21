import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TabelaComponent } from './tabela.component';
import { ComplaintService } from '../../complaints/access/complaint.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

describe('TabelaComponent', () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;
  let complaintService: ComplaintService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  const mockComplaints = [
    { id: '1', neighborhood: 'Centro', date: '2023-07-19T00:00:00Z', type: 'Física' },
    { id: '2', neighborhood: 'Bairro Alto', date: '2023-07-20T00:00:00Z', type: 'Verbal' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [TabelaComponent],
      providers: [
        provideHttpClientTesting(),
        ComplaintService,
        provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
    complaintService = TestBed.inject(ComplaintService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    spyOn(complaintService, 'getComplaintSummaries').and.returnValue(of({
      complaints: mockComplaints,
      total_pages: 1,
      total: 2
    }));
    spyOn(complaintService, 'getComplaintsByDateRange').and.returnValue(of({
      complaints: mockComplaints,
      total_pages: 1,
      total: 2
    }));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load complaints on init', () => {
    component.ngOnInit();
    expect(component.complaints()).toEqual(mockComplaints);
  });

  it('should call loadComplaints on init', () => {
    spyOn(component, 'loadComplaints');
    component.ngOnInit();
    expect(component.loadComplaints).toHaveBeenCalled();
  });

  it('should filter complaints by date range', () => {
    component.startDate.set('2023-07-01');
    component.endDate.set('2023-07-31');
    component.onFilterByDateRange();
    expect(component.complaints()).toEqual(mockComplaints);
  });

  it('should navigate to complaint details on row click', () => {
    spyOn(router, 'navigate');
    const row = fixture.debugElement.query(By.css('tbody tr'));
    row.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['/complaints', '1']);
  });

  it('should clear filters', () => {
    component.clearFilters();
    expect(component.startDate()).toBe('');
    expect(component.endDate()).toBe('');
    expect(component.isFiltering()).toBe(false);
  });

  it('should paginate correctly', () => {
    component.totalPages.set(3);
    component.currentPage.set(2);
    component.nextPage();
    expect(component.currentPage()).toBe(3);
    component.prevPage();
    expect(component.currentPage()).toBe(2);
  });
});
