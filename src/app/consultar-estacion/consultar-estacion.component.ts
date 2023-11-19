import { Component } from '@angular/core';
import { ZonaService } from '../service/zona.service';
import { EstacionesService } from '../service/estacione.service';
import { ApiService } from '../service/api.service';
interface Estacion {
  idEstacion: number;
  nombre: string;
  idZona: number;
  estado: boolean;
}
@Component({
  selector: 'app-consultar-estacion',
  templateUrl: './consultar-estacion.component.html',
  styleUrls: ['./consultar-estacion.component.scss']
})

export class ConsultarEstacionComponent {
  opcionesEstacion: any[] = [];
  activeTab: string = 'busqueda-especifica';
  opcionesZona: any[] = [];
  selectedZonaIndex: number | null = null;
  selectedRutaIndex: number | null = null;
  filtrado: any[] = [];
  mostrarEstacion: boolean = false;
  busquedaId: Estacion | null = null;

  //se llama servicio de zonas
  constructor(
    private zonaService: ZonaService,
    private estacionesService: EstacionesService,
    private apiService: ApiService
    ) { }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
    this.actualizarEstaciones();
  }

  // Llena las opciones según la información de zonas
  actualizarOpcionesZona(): void {
    this.zonaService.getZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
  }
  // Actualiza las estaciones
  actualizarEstaciones(): void {
    this.estacionesService.getEstacion().then(opcionesEstacion => {
      this.opcionesEstacion = opcionesEstacion;

    });
  }
  // Maneja el cambio en la selección de la zona
  onZonaChange(event: any): void {
    this.actualizarEstaciones();
    let filtro: number | null = null;
    const selectedIndex = event.target.selectedIndex;
    this.selectedZonaIndex = selectedIndex;
    if (selectedIndex >= 0 && this.opcionesZona && this.opcionesZona.length > 0) {
        filtro= this.opcionesZona[selectedIndex-1].idZona;
        this.filtrado = this.opcionesEstacion = this.opcionesEstacion.filter(opcion => opcion.idZona === filtro);
    } else {
      console.log('No hay elementos seleccionados o opcionesZona no está definido o está vacío.');
    }
  }
  // Maneja el cambio en la selección de la ruta
  onRutaChange(event: any): void {
    const selectedIndex = event.target.selectedIndex;
    this.selectedRutaIndex = selectedIndex;
  }
   // Envía la estación seleccionada de la api
  enviarEstacionSeleccionada(): void {
    // Verifica si hay una estación seleccionada y selectedRutaIndex no es nulo
    if (this.filtrado.length > 0 && this.selectedRutaIndex !== null) {
      let a: number | null = this.selectedRutaIndex;
      this.mostrarEstacion = true;
      // Verifica que a no sea nulo y está dentro del rango de índices de filtrado
      if (a >= 1 && a <= this.filtrado.length) {
        const idEstacionSeleccionada = this.filtrado[a - 1].idEstacion;
        this.apiService.obtenerEstacionPorId(idEstacionSeleccionada).subscribe((estacion: Estacion) => {
          this.busquedaId = estacion;
        });
      } else {
        console.log('Índice de estación seleccionada no válido.');
      }
    } else {
      console.log('No hay estación seleccionada o selectedRutaIndex es nulo.');
    }
  }
}
