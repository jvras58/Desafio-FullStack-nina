import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-genero-chart',
  templateUrl: './genero-chart.component.html',
  standalone: true,
  styleUrls: ['./genero-chart.component.scss'],
  imports: [BaseChartDirective]
})
export class GeneroChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  public barChartLabels: string[] = ['Mulheres', 'Homens', 'Não-binários'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Cisgênero', backgroundColor: 'rgba(91, 67, 217, 1)'},
      { data: [], label: 'Transgênero', backgroundColor: 'rgba(151, 134, 242, 1)'},
    ]
  };

  constructor(private dashboardService: DashboardService) {}
  
  ngOnInit(): void {
    this.dashboardService.getGenderGroupData().subscribe({
      next: data => {
        const cisgenderData = [data['CIS_FEMALE'], data['CIS_MALE'], data['OTHER']];
        const transgenderData = [data['TRANS_FEMALE'], data['TRANS_MALE'], data['OTHER']];
        const maxDataValue = Math.max(...cisgenderData, ...transgenderData) + 10;

        this.barChartOptions.scales!['y']!.max = maxDataValue;

        this.barChartData = {
          labels: this.barChartLabels,
          datasets: [
            { data: cisgenderData, label: 'Cisgênero', backgroundColor: 'rgba(91, 67, 217, 1)' },
            { data: transgenderData, label: 'Transgênero', backgroundColor: 'rgba(151, 134, 242, 1)' },
          ]
        };
      },
      error: error => {
        console.error('Erro ao buscar os dados da API:', error);
      }
    });
  }
}
