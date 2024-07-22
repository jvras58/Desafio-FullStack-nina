import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-age-range-chart',
  templateUrl: './age-range-chart.component.html',
  standalone: true,
  imports: [BaseChartDirective]
})
export class AgeRangeChartComponent implements OnInit {
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
        max: 200,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Idade confirmada', backgroundColor: 'rgba(91, 67, 217, 1)' },
      { data: [], label: 'Idade estimada', backgroundColor: 'rgba(151, 134, 242, 1)' },
    ]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAgeGroupData().subscribe({
      next: data => {
        this.barChartLabels = Object.keys(data);
        this.barChartData.labels = this.barChartLabels;
        this.barChartData.datasets[0].data = Object.values(data);

      },
      error: error => {
        console.error('Erro ao buscar os dados da API:', error);
      }
    });
  }
}
