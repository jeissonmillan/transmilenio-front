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
  estacionesJson = [
    {
      "idEstacion": 9120,
      "nombre": "Calle 63"
    },
    {
      "idEstacion": 12000,
      "nombre": "Puente Aranda"
    },
    {
      "idEstacion": 5103,
      "nombre": "Marsella "
    },
    {
      "idEstacion": 3001,
      "nombre": "La Campiña"
    },
    {
      "idEstacion": 5005,
      "nombre": "Transversal 86"
    },
    {
      "idEstacion": 9109,
      "nombre": "Ciudad universitaria"
    },
    {
      "idEstacion": 9109,
      "nombre": "Tercer Milenio"
    },
    {
      "idEstacion": 4107,
      "nombre": "Escuela Militar"
    },
    {
      "idEstacion": 4003,
      "nombre": "Av Cali"
    },
    {
      "idEstacion": 2201,
      "nombre": "Prado"
    },
    {
      "idEstacion": 9110,
      "nombre": "Av Jimenez"
    },
    {
      "idEstacion": 9113,
      "nombre": "Calle 22"
    },
    {
      "idEstacion": 5002,
      "nombre": "Biblioteca tintal"
    },
    {
      "idEstacion": 7108,
      "nombre": " Av El Dorado"
    },
    {
      "idEstacion": 7109,
      "nombre": "CAD "
    },
    {
      "idEstacion": 9116,
      "nombre": "Av 39"
    },
    {
      "idEstacion": 2303,
      "nombre": "Calle 85"
    },
    {
      "idEstacion": 3004,
      "nombre": "Gratamira"
    },
    {
      "idEstacion": 3004,
      "nombre": "Gratamira"
    },
    {
      "idEstacion": 5000,
      "nombre": "portal de las americas"
    },
    {
      "idEstacion": 6103,
      "nombre": "calle 26"
    },
    {
      "idEstacion": 4000,
      "nombre": "portal de la 80"
    },
    {
      "idEstacion": 4105,
      "nombre": "carrera 53"
    },
  ];

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
    const diaSemanaNumero: number = parseInt(this.seleccion.diaSemana, 10);
    const datos = {
      "diaSemana": diaSemanaNumero,
      "codigoOrigen": this.seleccion.origen,
      "codigoDestino": this.seleccion.destino
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
          console.log(this.rutaSeleccionada)
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
  ///////CODIGO TEMPORAL////////////////

  filtrarEstacionesInicialPrueba(event: any): void {
    const query = event.target.value.toLowerCase();
    this.estacionesFiltradasInicial = this.estacionesJson.filter(estacion =>
      estacion.nombre.toLowerCase().includes(query)
    );
  }

  filtrarEstacionesFinalPrueba(event: any): void {
    const query = event.target.value.toLowerCase();
    this.estacionesFiltradasFinal = this.estacionesJson.filter(estacion =>
      estacion.nombre.toLowerCase().includes(query)
    );
  }

}
