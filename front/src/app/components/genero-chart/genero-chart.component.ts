import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
      { data: [], label: 'Cisgênero', backgroundColor: 'rgba(75, 0, 130, 0.8)' },
      { data: [], label: 'Transgênero', backgroundColor: 'rgba(186, 85, 211, 0.6)' },
    ]
  };

  constructor(private http: HttpClient) {}
  
  // TODO: Refactor : criar um service para buscar os dados da API
  ngOnInit(): void {
    this.http.get<{ [key: string]: number }>('https://desafio-fullstack-nina.onrender.com/complaints/group/genders')
      .subscribe({
        next: data => {
          const cisgenderData = [data['CIS_FEMALE'], data['CIS_MALE'], data['OTHER']];
          const transgenderData = [data['TRANS_FEMALE'], data['TRANS_MALE'], data['OTHER']];
          const maxDataValue = Math.max(...cisgenderData, ...transgenderData) + 10;
  
          this.barChartOptions.scales!['y']!.max = maxDataValue;

          this.barChartData = {
            labels: this.barChartLabels,
            datasets: [
              { data: cisgenderData, label: 'Cisgênero', backgroundColor: 'rgba(75, 0, 130, 0.8)' },
              { data: transgenderData, label: 'Transgênero', backgroundColor: 'rgba(186, 85, 211, 0.6)' },
            ]
          };
        },
        error: error => {
          console.error('Erro ao buscar os dados da API:', error);
        }
      });
  }
}
