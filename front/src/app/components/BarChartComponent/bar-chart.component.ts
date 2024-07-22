import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  standalone: true,
  imports: [BaseChartDirective]
})
export class BarChartComponent implements OnInit {
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
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
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

  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderRadius: 10,
      borderSkipped: false
    }]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getNeighborhoodRanking().subscribe({
      next: data => {
        const labels = data.map(item => item.name);
        const counts = data.map(item => item.count);
        this.chartData.labels = labels;
        this.chartData.datasets[0].data = counts;
        const backgroundColors = labels.map((_, index) => 
          `rgba(255, 255, 255, ${Math.max(0.2, 0.8 - (index * 0.05))})`
        );
        this.chartData.datasets[0].backgroundColor = backgroundColors;
        
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
