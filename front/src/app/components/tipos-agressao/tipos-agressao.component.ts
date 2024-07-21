import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-tipos-agressao',
  templateUrl: './tipos-agressao.component.html',
  styleUrls: ['./tipos-agressao.component.scss'],
  standalone: true,
  imports: [BaseChartDirective]
})
export class TiposAgressaoComponent implements OnInit {

  public barChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'black',
        },
        position: 'top',
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: 'black'
        },
        grid: {
          display: false
        }
      }
    }
  };

  public barChartLabels: string[] = [];
  public barChartType: 'bar' = 'bar';
  public barChartLegend = false;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{
      data: [],
      backgroundColor: ['#5B43D9', '#6B4BD9', '#7B55D9', '#8B5FD9'],
      borderWidth: 0
    }]
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ [key: string]: number }>('https://desafio-fullstack-nina.onrender.com/complaints/group/types')
      .subscribe({
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