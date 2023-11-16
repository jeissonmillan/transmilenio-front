import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-consultar-ruta',
  templateUrl: './consultar-ruta.component.html',
  styleUrls: ['./consultar-ruta.component.scss']
})
export class ConsultarRutaComponent implements OnInit {
  datos: any;
  imagenBase64: string | undefined;
  activeTab: string = 'rutas'; // Define activeTab

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {

  }
  enviarConsulta(): void {
    this.apiService.enviarDatosDesdeArchivo().subscribe(
      (result) => {
        if (result.response) {
          this.imagenBase64 = result.response;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
