import { Component } from '@angular/core';
import { ZonaService } from '../service/zona.service';
import { EstacionesService } from '../service/estacione.service';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-consultar-estacion',
  templateUrl: './consultar-estacion.component.html',
  styleUrls: ['./consultar-estacion.component.scss']
})

export class ConsultarEstacionComponent {
  opcionesEstacion: any[] = [];
  activeTab: string = 'estaciones';
  opcionesZona: any[] = [];
  zonaSeleccionada: number | null = null;
  selectedZonaIndex: number | null = null;
  filtrado: any[] = [];
  mostrarEstacion: boolean = false;
  //se llama servicio de zonas
  constructor(private zonaService: ZonaService, private estacionesService: EstacionesService, private apiService: ApiService) { }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
    this.actualizarEstaciones();
  }

  //se llenan las opciones segun la informacion de zonas
  actualizarOpcionesZona(): void {
    this.zonaService.getZona().then(opcionesZona => {
      this.opcionesZona = opcionesZona;
    });
  }
  actualizarEstaciones(): void {
    this.estacionesService.getEstacion().then(opcionesEstacion => {
      this.opcionesEstacion = opcionesEstacion;

    });
  }

  onZonaChange(event: any): void {
    this.actualizarEstaciones();
    let filtro: number | null = null;
    const selectedIndex = event.target.selectedIndex;
    this.selectedZonaIndex = selectedIndex;
    if (selectedIndex >= 0 && this.opcionesZona && this.opcionesZona.length > 0) {
        filtro= this.opcionesZona[selectedIndex-1].idZona;
        this.filtrado = this.opcionesEstacion = this.opcionesEstacion.filter(opcion => opcion.idZona === filtro);
        console.log(this.filtrado);
        console.log(selectedIndex);
        console.log(filtro);
    } else {
      console.log('No hay elementos seleccionados o opcionesZona no está definido o está vacío.');
    }
  }
  enviarEstacionSeleccionada(): void {
    // Verifica si hay una estación seleccionada

    if (this.filtrado.length >= 0) {
      this.mostrarEstacion = true;
      const idEstacionSeleccionada = this.filtrado[0].idEstacion;
      this.apiService.obtenerEstacionPorId(idEstacionSeleccionada).subscribe(estacion => {
        // Aquí puedes hacer algo con la respuesta de la API
        console.log('Estación seleccionada:', estacion);
      });
    } else {
      console.log('No hay estación seleccionada.');
    }
    console.log('Estación seleccionada enviada:', this.filtrado);

  }
}
