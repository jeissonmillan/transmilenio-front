import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ZonaService } from '../service/zona.service';
import { RutaService } from '../service/ruta.service';

@Component({
  selector: 'app-consultar-ruta',
  templateUrl: './consultar-ruta.component.html',
  styleUrls: ['./consultar-ruta.component.scss']
})
export class ConsultarRutaComponent implements OnInit {
  opcionesZona: any[] = [];
  opcionesRuta: any[] = [];
  datos: any;
  imagenBase64: string | undefined;
  //funcionamiento de tab
  activeTab: string = 'rutas';
  switchTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private zonaService: ZonaService, private apiService: ApiService, private  rutaservice: RutaService) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
    this.actualizarOpcionesRuta();
  }
  actualizarOpcionesRuta(): void {
    this.rutaservice.getRuta().then(opcionesRuta => {
      this.opcionesRuta = opcionesRuta;
    });
  }
  actualizarOpcionesZona(): void {
    this.zonaService.getZona().then(opcionesZona => {
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
}
