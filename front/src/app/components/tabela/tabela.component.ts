import { Component, OnInit, signal } from '@angular/core';
import { ComplaintService } from '../../complaints/access/complaint.service';
import { ComplaintSummary } from '../../shared/interfaces/complaints.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { NgForOf } from '@angular/common';
import { AgeRangeChartComponent } from "../age-range-chart/age-range-chart.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  imports: [FormsModule, CommonModule, NgForOf, AgeRangeChartComponent, DashboardComponent],
  styles: [`
    :host ::ng-deep .table td { vertical-align: top; padding: 0.5rem; }
  `],
})

export class TabelaComponent implements OnInit {
  complaints = signal<ComplaintSummary[]>([]);
  startDate = signal('2021-01-01');
  endDate = signal('2024-01-01');
  rowsPerPage = signal(10);
  currentPage = signal(1);
  totalPages = signal(1);
  isFiltering = signal(false);

  constructor(
    private complaintService: ComplaintService,
    private router: Router
  ) {}

  formatDate(dateString: string, isStartDate: boolean): string {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const time = isStartDate ? 'T00:00:00' : 'T23:59:59';
    return encodeURIComponent(`${formattedDate}${time}`);
  }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    if (this.isFiltering()) {
      this.loadComplaintsByDateRange(this.startDate(), this.endDate());
    } else {
      this.complaintService.getComplaintSummaries(this.rowsPerPage(), this.currentPage()).subscribe({
        next: (data) => {
          this.handleApiResponse(data);
        },
        error: (error) => {
          console.error('Erro ao carregar reclamações:', error);
        },
      });
    }
  }

  loadComplaintsByDateRange(startDate: string, endDate: string): void {
    const encodedStartDate = this.formatDate(startDate, true);
    const encodedEndDate = this.formatDate(endDate, false);
    this.complaintService.getComplaintsByDateRange(encodedStartDate, encodedEndDate, this.rowsPerPage(), this.currentPage()).subscribe({
      next: (data) => {
        this.handleApiResponse(data);
      },
      error: (error) => {
        console.error('Erro ao carregar reclamações por intervalo de datas:', error);
      },
    });
  }

  handleApiResponse(data: { complaints: ComplaintSummary[], total_pages: number, total: number }): void {
    if (data && data.complaints && typeof data.total_pages === 'number' && typeof data.total === 'number') {
      this.complaints.set(data.complaints);
      this.totalPages.set(data.total_pages);
      console.log('Total Pages:', this.totalPages());
    } else {
      console.error('Dados da API não são válidos:', data);
      this.totalPages.set(0);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadComplaints();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadComplaints();
    }
  }

  onFilterByDateRange(): void {
    this.currentPage.set(1);
    this.isFiltering.set(true);
    this.loadComplaintsByDateRange(this.startDate(), this.endDate());
  }

  viewDetails(id: string): void {
    this.router.navigate(['/complaints', id]);
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.startDate.set(input.value);
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.endDate.set(input.value);
  }

  clearFilters() {
    this.startDate.set('');
    this.endDate.set('');
    this.isFiltering.set(false);
    this.currentPage.set(1);
    this.loadComplaints();
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    let pages: number[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages = [1, 2, 3, 4, total];
      } else if (current >= total - 2) {
        pages = [1, total - 3, total - 2, total - 1, total];
      } else {
        pages = [1, current - 1, current, current + 1, total];
      }
    }

    return pages;
  }
}
