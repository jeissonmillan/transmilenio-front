import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../service/zona.service';

@Component({
  selector: 'app-consultar-evento',
  templateUrl: './consultar-evento.component.html',
  styleUrls: ['./consultar-evento.component.scss']
})
export class ConsultarEventoComponent implements OnInit {
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
