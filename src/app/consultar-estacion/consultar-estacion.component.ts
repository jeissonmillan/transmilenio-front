import { Component } from '@angular/core';
import { ZonaService } from '../service/zona.service';
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
  opcionesZona: any[] = [];

  constructor(private zonaService: ZonaService) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
  }

  actualizarOpcionesZona(): void {
    this.zonaService.getOpcionesZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
  }
}
