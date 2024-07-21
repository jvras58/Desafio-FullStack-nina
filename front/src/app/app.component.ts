import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import { FormsModule } from '@angular/forms';
import { HeaderLogoComponent } from "./shared/header-logo/header-logo.component";
import { AgeRangeChartComponent } from './components/age-range-chart/age-range-chart.component';
import { TiposAgressaoComponent } from "./components/tipos-agressao/tipos-agressao.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GeneroChartComponent } from "./components/genero-chart/genero-chart.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, TabelaComponent, HeaderLogoComponent, AgeRangeChartComponent, TiposAgressaoComponent, DashboardComponent, GeneroChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-nina';
}
