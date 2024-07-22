import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    standalone: true,
    imports: [CommonModule, BaseChartDirective]
})
export class DoughnutChartComponent implements OnInit {
    @Output() prev = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();
public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
    legend: {
        display: false
    },
    tooltip: {
        enabled: false
    }
    }
};

public chartData1: ChartData<'doughnut'> = {
    datasets: [{ data: [], backgroundColor: ['#ffffff', 'rgba(255, 255, 255, 0.1)'], borderWidth: 0 }]
};

public chartData2: ChartData<'doughnut'> = {
    datasets: [{ data: [], backgroundColor: ['#ffffff', 'rgba(255, 255, 255, 0.1)'], borderWidth: 0 }]
};

constructor(private dashboardService: DashboardService) {}

ngOnInit(): void {
    this.dashboardService.getMomentReportData().subscribe({
    next: data => {
        const truePercentage = data['True'] * 100 / (data['True'] + data['False']);
        const falsePercentage = data['False'] * 100 / (data['True'] + data['False']);

        // Atualiza chartData1 e 2 criando um novo objeto
        this.chartData1 = {
        ...this.chartData1,
        datasets: [{ data: [truePercentage, 100 - truePercentage], backgroundColor: ['#ffffff', 'rgba(255, 255, 255, 0.1)'], borderWidth: 0 }]
        };

        this.chartData2 = {
        ...this.chartData2,
        datasets: [{ data: [falsePercentage, 100 - falsePercentage], backgroundColor: ['#ffffff', 'rgba(255, 255, 255, 0.1)'], borderWidth: 0 }]
        };
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

