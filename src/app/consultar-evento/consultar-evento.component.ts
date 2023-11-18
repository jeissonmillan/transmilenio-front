import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../service/zona.service';
import { EstacionesService } from '../service/estacione.service';

@Component({
  selector: 'app-consultar-evento',
  templateUrl: './consultar-evento.component.html',
  styleUrls: ['./consultar-evento.component.scss']
})
export class ConsultarEventoComponent implements OnInit {
  opcionesZona: any[] = [];
  opcionesEstacion: any[] = [];

  //se llama servicio de zonas
  constructor(private zonaService: ZonaService, private estacionesService: EstacionesService) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
  }
  //se llenan opciones segun la carga de zonas
  actualizarOpcionesZona(): void {
    this.zonaService.getZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
  }
  actualizarEstaciones(): void {
    this.estacionesService.getEstacion().then(opcionesEstacion => {
      this.opcionesEstacion = opcionesEstacion;
    });
  }
}
