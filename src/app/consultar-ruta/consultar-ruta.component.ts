import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ZonaService } from '../service/zona.service';

@Component({
  selector: 'app-consultar-ruta',
  templateUrl: './consultar-ruta.component.html',
  styleUrls: ['./consultar-ruta.component.scss']
})
export class ConsultarRutaComponent implements OnInit {
  opcionesZona: any[] = [];
  datos: any;
  imagenBase64: string | undefined;
  activeTab: string = 'rutas'; // Define activeTab

  constructor(private zonaService: ZonaService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
  }

  actualizarOpcionesZona(): void {
    this.zonaService.getOpcionesZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
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
