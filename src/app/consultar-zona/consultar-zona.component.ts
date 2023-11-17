import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-consultar-zona',
  templateUrl: './consultar-zona.component.html',
  styleUrls: ['./consultar-zona.component.scss']
})
export class ConsultarZonaComponent implements OnInit{
  zonas: any[] = [];
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.obtenerZonas();
  }
  obtenerZonas(): void {
    this.apiService.obtenerZonas().subscribe(
      (zonas) => {
        this.zonas = zonas;
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }
}
