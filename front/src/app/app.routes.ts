import { Routes } from '@angular/router';
import { ComplaintDetailComponent } from './components/complaint-detail/complaint-detail.component';
import { TabelaComponent } from './components/tabela/tabela.component';

export const routes: Routes = [
    { path: '', component: TabelaComponent },
    { path: 'complaints/:id', component: ComplaintDetailComponent },

];
