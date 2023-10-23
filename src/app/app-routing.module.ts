import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ReportarEventoComponent } from './reportar-evento/reportar-evento.component';
import { ConsultarEventoComponent } from './consultar-evento/consultar-evento.component';
import { ConsultarZonaComponent } from './consultar-zona/consultar-zona.component';
import { ConsultarRutaComponent } from './consultar-ruta/consultar-ruta.component';
import { ConsultarEstacionComponent } from './consultar-estacion/consultar-estacion.component';


//rutas de navegacion
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component:HomeComponent},
  { path: 'consultar', component:ConsultarComponent},
  { path: 'reportar-evento', component:ReportarEventoComponent},
  { path: 'consultar-evento', component:ConsultarEventoComponent},
  { path: 'consultar-zona', component:ConsultarZonaComponent},
  { path: 'consultar-ruta', component:ConsultarRutaComponent},
  { path: 'consultar-estacion', component:ConsultarEstacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
