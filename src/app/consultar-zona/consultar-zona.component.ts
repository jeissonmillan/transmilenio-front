import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../service/zona.service';

@Component({
  selector: 'app-consultar-zona',
  templateUrl: './consultar-zona.component.html',
  styleUrls: ['./consultar-zona.component.scss']
})
export class ConsultarZonaComponent implements OnInit {
  opcionesZona: any[] = [];
  activeTab: string = 'zona';
  constructor(private zonaService: ZonaService) { }
  switchTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnInit(): void {
    this.actualizarOpcionesZona();
  }

  actualizarOpcionesZona(): void {
    this.zonaService.getOpcionesZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
  }
}
