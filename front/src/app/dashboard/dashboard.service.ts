import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = 'https://desafio-fullstack-nina.onrender.com';

  constructor(private http: HttpClient) {}

  getAgeGroupData(): Observable<{ [key: string]: number }> {
      return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/complaints/group/age_group`);
    }
  
  
}
