import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../service/zona.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-consultar-evento',
  templateUrl: './consultar-evento.component.html',
  styleUrls: ['./consultar-evento.component.scss']
})
export class ConsultarEventoComponent implements OnInit {
  Zona: any[] = [];
  seleccion: number | null = null; // Corregido el nombre de la propiedad
  evento: any;
  estacion: any;

  //se llama servicio de zonas
  constructor(
    private zonaService: ZonaService,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.actualizarOpcionesZona();
  }
  //se llenan opciones segun la carga de zonas
  actualizarOpcionesZona(): void {
    this.zonaService.getZona().then(Zona => {
      this.Zona = Zona;
    });
  }
  enviarConsultaevento(): void {
    if (this.seleccion) {
      const eleccion = this.seleccion;
      console.log('Zona seleccionada:', eleccion);
      this.apiService.obtenerEventoPorId(eleccion).subscribe((eleccion1) => {
        this.evento = eleccion1;
        console.log('este es evento', this.evento)
        if(this.evento==null){
          alert('No se encontro ningun evento');
        }else{
           this.apiService.obtenerEstacionPorId(eleccion1.idEstacion).subscribe((estacion)=>{
            this.estacion = estacion;
            console.log('este es estaciones',estacion.nombre)
           });
        }
      });
    } else {
      alert('Por favor, seleccione una Zona antes de enviar.');
    }
  }

}
