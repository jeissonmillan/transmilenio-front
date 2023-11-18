import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../service/zona.service';

@Component({
  selector: 'app-reportar-evento',
  templateUrl: './reportar-evento.component.html',
  styleUrls: ['./reportar-evento.component.scss']
})
export class ReportarEventoComponent implements OnInit{
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
