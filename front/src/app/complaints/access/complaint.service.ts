import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComplaintSummary } from '../../shared/interfaces/complaints.interface';
import { BaseHttpService } from '../../shared/access/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService extends BaseHttpService {
  limit: number = 10;

  getComplaintById(id: string): Observable<any> {
    const url = `${this.apiUrl}/complaints/${id}`;
    return this.http.get<any>(url);
  }

  getComplaintSummaries(limit: number = this.limit, page: number): Observable<{ complaints: ComplaintSummary[], total_pages: number, total: number }> {
    const skip = (page - 1) * limit;
    const url = `${this.apiUrl}/complaints?limit=${limit}&skip=${skip}`;
    return this.getComplaintSummariesPaginated(url, limit);
  }

  getComplaintSummariesPaginated(url: string, take: number): Observable<{ complaints: ComplaintSummary[], total_pages: number, total: number }> {
    return this.http.get<{ complaints: any[], total_pages: number, total: number }>(url).pipe(
      map(response => ({
        complaints: response.complaints.map((complaint: any) => ({
          id: complaint.id,
          neighborhood: complaint.neighborhood,
          date: complaint.date,
          type: complaint.type
        })),
        total_pages: response.total_pages,
        total: response.total
      }))
    );
  }

  getComplaintsByDateRange(startDate: string, endDate: string, limit: number = this.limit, page: number): Observable<{ complaints: ComplaintSummary[], total_pages: number, total: number }> {
    const skip = (page - 1) * limit;
    const url = `${this.apiUrl}/complaints?from_date=${startDate}&to_date=${endDate}&limit=${limit}&skip=${skip}`;
    return this.http.get<{ complaints: any[], total_pages: number, total: number }>(url).pipe(
      map(response => ({
        complaints: response.complaints.map((complaint: any) => ({
          id: complaint.id,
          neighborhood: complaint.neighborhood,
          date: complaint.date,
          type: complaint.type
        })),
        total_pages: response.total_pages,
        total: response.total
      }))
    );
  }
}

export { ComplaintSummary };
