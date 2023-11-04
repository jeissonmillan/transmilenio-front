import { Component } from '@angular/core';

@Component({
  selector: 'app-consultar-ruta',
  templateUrl: './consultar-ruta.component.html',
  styleUrls: ['./consultar-ruta.component.scss']
})
export class ConsultarRutaComponent {
  activeTab: string = 'rutas'; // Inicialmente, 'rutas' está activa

  switchTab(tab: string) {

    this.activeTab = tab;
  }
}
