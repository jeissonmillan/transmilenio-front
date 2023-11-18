import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { ReportarEventoComponent } from './reportar-evento/reportar-evento.component';
import { HeaderComponent } from './header/header.component';
import { ConsultarEventoComponent } from './consultar-evento/consultar-evento.component';
import { ConsultarEstacionComponent } from './consultar-estacion/consultar-estacion.component';
import { ConsultarZonaComponent } from './consultar-zona/consultar-zona.component';
import { ConsultarRutaComponent } from './consultar-ruta/consultar-ruta.component';
import { ZonaService } from './service/zona.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultarComponent,
    ReportarEventoComponent,
    HeaderComponent,
    ConsultarEventoComponent,
    ConsultarEstacionComponent,
    ConsultarZonaComponent,
    ConsultarRutaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ ZonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
