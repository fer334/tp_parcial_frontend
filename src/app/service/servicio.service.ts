import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listadatos } from '../model/datos';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Servicio } from '../model/servicio';
import { Detalle } from '../model/detalle';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private api: string = 'http://181.123.243.5:8080/stock-pwfe/servicio';

  constructor(private http: HttpClient) {}

  // getPaciente(id: number): Observable<Paciente> {
  //   return this.http.get<Paciente>(this.api + '/' + id);
  // }

  getAll(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api);
  }

  createServicio(s: Servicio): Observable<Servicio>{

    return this.http.post<Servicio>(this.api,s).pipe(
          tap(
            // Log the result or error
            (data) => console.log('agregado ' + data),
            (error) => console.log('error: ' + error)
          )
        );
  }
  createDetalle(s: Detalle): Observable<Detalle>{
    return this.http.post<Detalle>(this.api,s).pipe(
          tap(
            // Log the result or error
            (data) => console.log('agregado ' + data),
            (error) => console.log('error: ' + error)
          )
        );
  }



  // delPaciente(id: number): Observable<Paciente> {
  //   console.log('delPaciente', this.api + '/' + id);

  //   return this.http.delete<Paciente>(this.api + '/' + id);
  // }

  // createPaciente(p: Paciente): Observable<Paciente> {
  //   const p2: Paciente = JSON.parse(JSON.stringify(p));
  //   p2.fechaNacimiento = p.fechaNacimiento
  //     ? formatDate(p.fechaNacimiento, 'yyyy-mm-dd hh:mm:ss', 'en-US')
  //     : null;

  //   return this.http.post<Paciente>(this.api, p2).pipe(
  //     tap(
  //       // Log the result or error
  //       (data) => console.log('agregado ' + data),
  //       (error) => console.log('error: ' + error)
  //     )
  //   );
  // }

  // updatePaciente(p: Paciente): Observable<Paciente> {
  //   const p2: Paciente = JSON.parse(JSON.stringify(p));
  //   p2.fechaNacimiento = p.fechaNacimiento
  //     ? formatDate(p.fechaNacimiento, 'yyyy-mm-dd hh:mm:ss', 'en-US')
  //     : null;

  //   return this.http.put<Paciente>(this.api, p2).pipe(
  //     tap(
  //       // Log the result or error
  //       (data) => console.log('modificado ' + data),
  //       (error) => console.log('error: ' + error)
  //     )
  //   );
  // }
}
