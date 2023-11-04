import { Component } from '@angular/core';

@Component({
  selector: 'app-consultar-estacion',
  templateUrl: './consultar-estacion.component.html',
  styleUrls: ['./consultar-estacion.component.scss']
})
export class ConsultarEstacionComponent {
  activeTab: string = 'estaciones'; // Inicialmente, 'estaciones' está activa

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
