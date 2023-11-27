import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //URL de servicios
  private urlImg = 'https://img-map-5cd18be2a1ca.herokuapp.com/api/getImg';
  private backUrl = 'https://poli-back-1-095db513e64a.herokuapp.com/api';

  constructor(private http: HttpClient) { }
  //peticion de ruta personalizada
  public enviarConsultaRuta(payload: any): Observable<any> {
    const consultaUrl = `${this.backUrl}/Rutas/GetStopsByRoute`;
    return this.http.post(consultaUrl, payload).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
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
  //peticion de estaciones por id
  obtenerEventoPorId(idZona: number): Observable<any> {
    const estacionUrl = `${this.backUrl}/Eventos/${idZona}`;
    return this.http.get<any>(estacionUrl).pipe(
      map((ruta) => ruta),
      catchError((error) => throwError(error))
    );
  }
  //peticion de imagen segun ruta
  public enviarDatosImg( rutaSeleccionada: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.urlImg, rutaSeleccionada, { headers, responseType: 'text' }).pipe(
      map((response) => ({ response })),
      retry(1),
      catchError((error) => throwError(error))
    );
  }
}
