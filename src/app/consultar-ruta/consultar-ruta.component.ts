import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ZonaService } from '../service/zona.service';
import { RutaService } from '../service/ruta.service';
import { EstacionesService } from '../service/estacione.service';

@Component({
  selector: 'app-consultar-ruta',
  templateUrl: './consultar-ruta.component.html',
  styleUrls: ['./consultar-ruta.component.scss']
})
export class ConsultarRutaComponent implements OnInit {
  opcionesZona: any[] = [];
  opcionesRuta: any[] = [];
  estaciones: any[] = [];
  seleccion: any = {};
  imagenBase64: string | undefined;

  estacionesFiltradasInicial: any[] = [];
  estacionesFiltradasFinal: any[] = [];
  //funcionamiento de tab

  activeTab: string = 'rutas';

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(
    private zonaService: ZonaService,
    private apiService: ApiService,
    private rutaservice: RutaService,
    private estacionesService: EstacionesService
  ) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
    this.actualizarOpcionesRuta();
    this.actualizarEstaciones();
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

  filtrarEstacionesInicial(event: any): void {
    const query = event.target.value.toLowerCase();
    this.estacionesFiltradasInicial = this.estaciones.filter(estacion =>
      estacion.nombre.toLowerCase().includes(query)
    );
  }

  filtrarEstacionesFinal(event: any): void {
    const query = event.target.value.toLowerCase();
    this.estacionesFiltradasFinal = this.estaciones.filter(estacion =>
      estacion.nombre.toLowerCase().includes(query)
    );
  }

  enviarConsulta(): void {
    if (
      this.seleccion.idRuta?.trim() !== '' &&
      this.seleccion.estacionInicial?.trim() !== '' &&
      this.seleccion.estacionFinal?.trim() !== ''
    ) {
      const payload = {
        diaSemana: this.seleccion.diaSemana,
        codigoOrigen: this.seleccion.estacionInicial,
        codigoDestino: this.seleccion.estacionFinal
      };
      console.log('Payload:', payload); // Agrega esta línea para verificar el payload

      this.apiService.enviarDatosDesdeArchivo().subscribe(
        (result) => {
          console.log('Resultado desde archivo:', result); // Agrega esta línea para verificar el resultado
          if (result.response) {
            this.imagenBase64 = result.response;
          }
        },
        (error) => {
          console.error('Error desde archivo:', error); // Agrega esta línea para verificar el error
        }
      );

      this.apiService.enviarConsultaRuta(payload).subscribe(
        (result: any) => {
          console.log('Resultado de la consulta de ruta:', result); // Agrega esta línea para verificar el resultado
          if (result.response) {
            this.imagenBase64 = result.response;
          }
        },
        (error: any) => {
          console.error('Error en la consulta de ruta:', error); // Agrega esta línea para verificar el error
        }
      );
    } else {
      console.error('Por favor, complete todos los campos del formulario.');
      console.error(this.seleccion);
    }
  }


  // Actualiza las estaciones
  actualizarEstaciones(): void {
    this.estacionesService.getEstacion().then(estaciones => {
      this.estaciones = estaciones;

    });
  }
}
