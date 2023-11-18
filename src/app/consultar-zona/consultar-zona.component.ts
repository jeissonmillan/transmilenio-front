import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../service/zona.service';

@Component({
  selector: 'app-consultar-zona',
  templateUrl: './consultar-zona.component.html',
  styleUrls: ['./consultar-zona.component.scss']
})
export class ConsultarZonaComponent implements OnInit {
  opcionesZona: any[] = [];
  constructor(private zonaService: ZonaService) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
  }

  actualizarOpcionesZona(): void {
    this.zonaService.getZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
  }
}
