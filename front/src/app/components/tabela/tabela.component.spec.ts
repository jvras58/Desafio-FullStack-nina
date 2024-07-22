import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaComponent } from './tabela.component';
import { ComplaintService } from '../../complaints/access/complaint.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgeRangeChartComponent } from '../age-range-chart/age-range-chart.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TabelaComponent', () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;
  let mockService: any;
  let complaintServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    complaintServiceMock = jasmine.createSpyObj('ComplaintService', ['getComplaintSummaries', 'getComplaintsByDateRange']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, FormsModule, HttpClientTestingModule,TabelaComponent, AgeRangeChartComponent, DashboardComponent],
      providers: [
        { provide: ComplaintService, useValue: complaintServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockService = {loadComplaints
      : () => {} };
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load complaints on init', () => {
    const mockComplaints = [
      { id: '1', neighborhood: 'Bairro 1', date: '2023-07-20', type: 'Tipo 1' },
    ];
    const mockResponse = { complaints: mockComplaints, total_pages: 1, total: 1 };
    complaintServiceMock.getComplaintSummaries.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(complaintServiceMock.getComplaintSummaries).toHaveBeenCalled();
    expect(component.complaints()).toEqual(mockComplaints);
    expect(component.totalPages()).toBe(1);
  });

  it('should handle API error when loading complaints', () => {
    complaintServiceMock.getComplaintSummaries.and.returnValue(throwError(() => new Error('Erro')));

    component.ngOnInit();

    expect(complaintServiceMock.getComplaintSummaries).toHaveBeenCalled();
    expect(component.complaints()).toEqual([]);
    expect(component.totalPages()).toBe(0);
  });

  it('should filter complaints by date range', () => {
    const mockComplaints = [
      { id: '1', neighborhood: 'Bairro 1', date: '2023-07-20', type: 'Tipo 1' },
    ];
    const mockResponse = { complaints: mockComplaints, total_pages: 1, total: 1 };
    complaintServiceMock.getComplaintsByDateRange.and.returnValue(of(mockResponse));

    component.onFilterByDateRange();

    expect(complaintServiceMock.getComplaintsByDateRange).toHaveBeenCalled();
    expect(component.complaints()).toEqual(mockComplaints);
    expect(component.totalPages()).toBe(1);
  });

  it('should handle API error when filtering complaints by date range', () => {
    complaintServiceMock.getComplaintsByDateRange.and.returnValue(throwError(() => new Error('Erro')));

    component.onFilterByDateRange();

    expect(complaintServiceMock.getComplaintsByDateRange).toHaveBeenCalled();
    expect(component.complaints()).toEqual([]);
    expect(component.totalPages()).toBe(0);
  });

  it('should navigate to complaint details', () => {
    component.viewDetails('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/complaints', '1']);
  });

  it('should update startDate on input change', () => {
    const event = { target: { value: '2023-07-20' } } as any;
    component.onStartDateChange(event);
    expect(component.startDate()).toBe('2023-07-20');
  });

  it('should update endDate on input change', () => {
    const event = { target: { value: '2023-07-21' } } as any;
    component.onEndDateChange(event);
    expect(component.endDate()).toBe('2023-07-21');
  });

  it('should clear filters and reload complaints', () => {
    spyOn(component, 'loadComplaints');
    component.clearFilters();
    expect(component.startDate()).toBe('');
    expect(component.endDate()).toBe('');
    expect(component.isFiltering()).toBe(false);
    expect(component.currentPage()).toBe(1);
    expect(component.loadComplaints).toHaveBeenCalled();
  });

  it('should go to the next page', () => {
    spyOn(component, 'loadComplaints');
    component.totalPages.set(3);
    component.currentPage.set(1);
    component.nextPage();
    expect(component.currentPage()).toBe(2);
    expect(component.loadComplaints).toHaveBeenCalled();
  });

  it('should not go to the next page if on the last page', () => {
    spyOn(component, 'loadComplaints');
    component.totalPages.set(3);
    component.currentPage.set(3);
    component.nextPage();
    expect(component.currentPage()).toBe(3);
    expect(component.loadComplaints).not.toHaveBeenCalled();
  });

  it('should go to the previous page', () => {
    spyOn(component, 'loadComplaints');
    component.totalPages.set(3);
    component.currentPage.set(2);
    component.prevPage();
    expect(component.currentPage()).toBe(1);
    expect(component.loadComplaints).toHaveBeenCalled();
  });

  it('should not go to the previous page if on the first page', () => {
    spyOn(component, 'loadComplaints');
    component.totalPages.set(3);
    component.currentPage.set(1);
    component.prevPage();
    expect(component.currentPage()).toBe(1);
    expect(component.loadComplaints).not.toHaveBeenCalled();
  });
});
