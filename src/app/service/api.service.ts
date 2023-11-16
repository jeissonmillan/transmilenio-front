import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlImg = 'https://img-map-5cd18be2a1ca.herokuapp.com/api/getImg';
  private jsonFileUrl = 'assets/prueba.json';

  constructor(private http: HttpClient) { }

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

  private cargarDatosDesdeArchivo(): Observable<any> {
    return this.http.get<any>(this.jsonFileUrl);
  }
}
