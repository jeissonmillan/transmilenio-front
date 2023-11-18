import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //URL de servicios
  private urlImg = 'https://img-map-5cd18be2a1ca.herokuapp.com/api/getImg';
  private jsonFileUrl = 'assets/prueba.json';
  private backUrl = 'https://poli-back-1-095db513e64a.herokuapp.com/api';

  constructor(private http: HttpClient) { }
  //peticion de imagen segun ruta
  public enviarDatosDesdeArchivo(): Observable<any> {
    return this.cargarDatosDesdeArchivo().pipe(
      switchMap((body) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        return this.http.post(this.urlImg, body, { headers, responseType: 'text' }).pipe(
          map((response) => ({ response })),
          catchError((error) => throwError(error))
        );
      })
    );
  }
  //peticion de zonas
  public obtenerZonas(): Observable<any[]> {
    const zonasUrl = `${this.backUrl}/zonas`;
    return this.http.get<any[]>(zonasUrl).pipe(
      map((zonas) => zonas),
      catchError((error) => throwError(error))
    );
  }
  //peticion de rutas
  public obtenerRutas(): Observable<any[]> {
    const rutaUrl = `${this.backUrl}/rutas`;
    return this.http.get<any[]>(rutaUrl).pipe(
      map((ruta) => ruta),
      catchError((error) => throwError(error))
    );
  }
  //peticion de estaciones
  public obtenerEstacion(): Observable<any[]> {
    const estacionUrl = `${this.backUrl}/estaciones`;
    return this.http.get<any[]>(estacionUrl).pipe(
      map((ruta) => ruta),
      catchError((error) => throwError(error))
    );
  }
  //peticion de estaciones por id
  obtenerEstacionPorId(idEstacion: number): Observable<any> {
    const estacionUrl = `${this.backUrl}/estaciones/${idEstacion}`;
    return this.http.get<any>(estacionUrl).pipe(
      map((ruta) => ruta),
      catchError((error) => throwError(error))
    );
  }
  //se cargan datos de rutas
  private cargarDatosDesdeArchivo(): Observable<any> {
    return this.http.get<any>(this.jsonFileUrl);
  }
}
