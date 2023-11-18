import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private apiService: ApiService) {}
  getRuta(): Promise<any[]> {
    return this.apiService.obtenerRutas()
      .toPromise()
      .then((ruta) => {
        // Verificar si zonas está definido
        if (ruta) {
            // Transforma las zonas en opciones { value, label }
            return ruta.map(ruta => ({ idZona: ruta.idZona, nombre: ruta.nombre }));
        } else {
            // Si zonas es undefined, devuelve un array vacío
            return [];
        }
    })
      .catch((error) => {
        console.error('Error al obtener las zonas:', error);
        return []; // Devuelve un array vacío en caso de error
      });
  }
}
