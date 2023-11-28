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
  rutaSeleccionada: any = { duration: undefined, stations: {} };
  estacionesFiltradasInicial: any[] = [];
  estacionesFiltradasFinal: any[] = [];
  activeTab: string = 'busqueda-especifica';

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(
    private zonaService: ZonaService,
    private rutaservice: RutaService,
    private estacionesService: EstacionesService,
    private apiService: ApiService
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
    this.seleccion.diaSemana &&
    this.seleccion.estacionInicial &&
    this.seleccion.estacionFinal
  ) {
    const payload = {
      codigoOrigen: this.seleccion.estacionInicial,
      codigoDestino: this.seleccion.estacionFinal
    };
    const datos = {
      diaSemana: this.seleccion.diaSemana.toString(),
      codigoOrigen: this.seleccion.estacionInicial.toString(),
      codigoDestino: this.seleccion.estacionFinal.toString()
    };
    console.log(datos)
    this.apiService.enviarConsultaRuta(datos).subscribe(
      (result: any) => {
        if (result.paradas) {
          this.rutaSeleccionada = {
            duration: result.tiempo,
            stations: result.paradas.map((parada: any, index: number) => {
              return {
                name: parada[1],
                stand: true // Ajusta esto según tus necesidades
              };
            })
          };
          this.apiService.enviarDatosImg(this.rutaSeleccionada).subscribe(
            (result) => {
              if (result.response) {
                this.imagenBase64 = result.response;
              }
            },
            (error: any) => {
              console.error('Error en el POST:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error en la consulta de ruta:', error);
      }
    );
  } else {
    alert('Por favor, complete todos los campos del formulario.');
  }
}
  // Actualiza las estaciones
  actualizarEstaciones(): void {
    this.estacionesService.getEstacion().then(estaciones => {
      this.estaciones = estaciones;
    });
  }
}
