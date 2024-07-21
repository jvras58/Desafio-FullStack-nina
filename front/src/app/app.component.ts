import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import { FormsModule } from '@angular/forms';
import { HeaderLogoComponent } from "./shared/header-logo/header-logo.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, TabelaComponent, HeaderLogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-nina';
}
