import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlImg='https://img-map-5cd18be2a1ca.herokuapp.com/api/getImg';
  private jsonFileUrl='assets/prueba.json';
  constructor(private http: HttpClient) { }
  public getData(): Observable<any>{
    return  this.http.get<any>(this.urlImg);
  }
  enviarDatosDesdeArchivo(): Observable<any> {
    return this.cargarDatosDesdeArchivo().pipe(
      // Realizar la solicitud POST después de cargar el archivo JSON
      switchMap((body) => this.http.post<any>(this.urlImg, body))
    );
  }
  cargarDatosDesdeArchivo(): Observable<any> {
    return this.http.get<any>(this.jsonFileUrl);
  }

}
