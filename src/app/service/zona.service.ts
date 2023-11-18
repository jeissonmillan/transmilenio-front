import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
@Injectable({
  providedIn: 'root',
})
export class ZonaService {
  constructor(private apiService: ApiService) {}

  getOpcionesZona(): Promise<any[]> {
    return this.apiService.obtenerZonas()
      .toPromise()
      .then((zonas) => {
        // Verificar si zonas está definido
        if (zonas) {
            // Transforma las zonas en opciones { value, label }
            return zonas.map(zona => ({ value: zona.idZona, label: zona.nombre }));
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
