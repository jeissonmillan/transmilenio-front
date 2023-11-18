import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {


  constructor(private apiService: ApiService) { }

  getEstacion(): Promise<any[]> {
    return this.apiService.obtenerEstacion()
      .toPromise()
      .then((estacion) => {
        if (estacion) {
          // Transforma las zonas en opciones { value, label }
          return estacion.map(estacion => ({
            idEstacion: estacion.idEstacion,
            idZona: estacion.idZona,
            nombre: estacion.nombre,
            estado: Boolean(estacion.estado)
          }));
        } else {
          // Si zonas es undefined, devuelve un array vacío
          return [];
        }
      })
      .catch((error) => {
        console.error('Error al obtener las zonas:', error);
        // Devuelve un array vacío en caso de error
        return [];
      });
  }
}
