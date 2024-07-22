import { Component } from '@angular/core';
import { DoughnutChartComponent } from '../DoughnutChartComponent/doughnut-chart.component';
import { LineChartComponent } from '../LineChartComponent/line-chart.component';
import { BarChartComponent } from '../BarChartComponent/bar-chart.component';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-chart-pagination',
templateUrl: './chart-pagination.component.html',
standalone: true,
imports: [CommonModule,DoughnutChartComponent, LineChartComponent, BarChartComponent]
})
export class ChartPaginationComponent {
    currentIndex = 0;
    totalPages = 3;

    prevPage() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.totalPages - 1;
    }
    
    nextPage() {
        this.currentIndex = (this.currentIndex < this.totalPages - 1) ? this.currentIndex + 1 : 0;
    }

    goToPage(index: number) {
    this.currentIndex = index;
    }
}