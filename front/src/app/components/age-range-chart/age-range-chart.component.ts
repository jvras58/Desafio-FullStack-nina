import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataset, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-age-range-chart',
  templateUrl: './age-range-chart.component.html',
  standalone: true,
  styleUrls: ['./age-range-chart.component.scss'],
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
      { data: [], label: 'Idade confirmada', backgroundColor: 'rgba(75, 0, 130, 0.8)' },
      { data: [], label: 'Idade estimada', backgroundColor: 'rgba(186, 85, 211, 0.6)' },
    ]
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ [key: string]: number }>('https://desafio-fullstack-nina.onrender.com/complaints/group/age_group')
      .subscribe({
        next: data => {
          this.barChartLabels = Object.keys(data);
          this.barChartData.labels = this.barChartLabels;
          this.barChartData.datasets[0].data = Object.values(data);
          // FIXME: Simulando dados estimados pois não temos endpoints com datas confirmadas
          this.barChartData.datasets[1].data = [40, 70, 120, 80, 50, 30, 20, 60];
        },
        error: error => {
          console.error('Erro ao buscar os dados da API:', error);
        }
      });
  }
}
