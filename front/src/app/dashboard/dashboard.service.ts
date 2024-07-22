import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../shared/access/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseHttpService {

  getAgeGroupData(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/complaints/group/age_group`);
  }

  getGenderGroupData(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/complaints/group/genders`);
  }

  getAggressionTypesData(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/complaints/group/types`);
  }
  
  // grafico de paginação:
  getMomentReportData(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/complaints/group/at_moment`);
  }

  getCasesPerMonth(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/complaints/group/months`);
  }

  getNeighborhoodRanking(): Observable<{ name: string, count: number }[]> {
    return this.http.get<{ name: string, count: number }[]>(`${this.apiUrl}/complaints/group/neighborhoods`);
  }
}
