import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  standalone: true,
  imports: [BaseChartDirective]
})
export class LineChartComponent implements OnInit {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          color: 'white'
        },
        grid: {
          display: false
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          display: false
        }
      }
    }
  };

  public chartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      label: 'Casos por mês',
      data: [],
      borderColor: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fill: true
    }]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getCasesPerMonth().subscribe({
      next: data => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        this.chartData.labels = meses;
        this.chartData.datasets[0].data = meses.map(mes => data[mes] || 0);
        this.chart?.update();
      },
      error: error => {
        console.error('Erro ao buscar os dados da API:', error);
      }
    });
  }

  prevPage() {
    this.prev.emit();
  }

  nextPage() {
    this.next.emit();
  }
}
