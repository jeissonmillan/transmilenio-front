import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ReportarEventoComponent } from './reportar-evento/reportar-evento.component';


//rutas de navegacion
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component:HomeComponent},
  { path: 'consultar', component:ConsultarComponent},
  { path: 'reportar-evento', component:ReportarEventoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
