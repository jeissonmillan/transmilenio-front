import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-consultar-ruta',
  templateUrl: './consultar-ruta.component.html',
  styleUrls: ['./consultar-ruta.component.scss']
})
export class ConsultarRutaComponent implements OnInit {

  datos:any;
  constructor(private apiService : ApiService){}

  ngOnInit(): void {
    this.apiService.enviarDatosDesdeArchivo().subscribe(
      (data) => {
        this.datos = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  activeTab: string = 'rutas'; // Inicialmente, 'rutas' está activa

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
