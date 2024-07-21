import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';
import { GeneroChartComponent } from '../genero-chart/genero-chart.component';
import { TiposAgressaoComponent } from '../tipos-agressao/tipos-agressao.component';
import { AgeRangeChartComponent } from '../age-range-chart/age-range-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AgeRangeChartComponent, TiposAgressaoComponent, GeneroChartComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {
  ageGroupData: { [key: string]: number } | null = null;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAgeGroupData().subscribe({
      next: data => this.ageGroupData = data,
      error: () => this.error = 'Erro ao buscar dados'
    });
  }
}