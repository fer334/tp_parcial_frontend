import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiServicioDetalle: string = 'http://181.123.243.5:8080/stock-pwfe/servicio?detalle=S';

  constructor(private http: HttpClient) {}

  // getPaciente(id: number): Observable<Paciente> {
  //   return this.http.get<Paciente>(this.api + '/' + id);
  // }

  getAll(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api);
  }

  createServicio(s: Servicio): Observable<Servicio>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario2'
    });
    return this.http.post<Servicio>(this.api,s,{headers:headers}).pipe(
          tap(
            // Log the result or error
            (data) => console.log('agregado ' + data),
            (error) => console.log('error: ' + error)
          )
        );
  }

  createDetalle(s: Detalle): Observable<Detalle>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario'
    });
    return this.http.post<Detalle>(this.api,s,{headers:headers}).pipe(
          tap(
            // Log the result or error
            (data) => console.log('agregado ' + data),
            (error) => console.log('error: ' + error)
          )
        );
  }

  getDetalles(idCliente: number, idEmpleado: number, fechadesde: string, fechahasta: string, idPresentacionProducto: number): Observable<listadatos<Detalle>> {
                              //{ "idServicio": { "idFichaClinica":{ "idCliente":{ "idPersona":90 } }, "idEmpleado":{ "idPersona":2 }, "fechaDesdeCadena":null, "fechaHastaCadena":null }, "idPresentacionProducto": { "idPresentacionProducto":334} }
    let payload = JSON.stringify({idServicio:{idFichaClinica:{idCliente:{idPersona:idCliente}},idEmpleado:{idPersona:idEmpleado},fechaDesdeCadena:fechadesde,fechaHastaCadena:fechahasta},idPresentacionProducto:{idPresentacionProducto:idPresentacionProducto}  });
    return this.http.get<listadatos<Detalle>>(this.apiServicioDetalle,{params:{ejemplo:payload}});
  }

  getServiciosPorFichaClinica(idFicha: number): Observable<listadatos<Servicio>>{
    let payload = JSON.stringify({idFichaClinica:{idFichaClinica: idFicha}});
    return this.http.get<listadatos<Servicio>>(this.api,{params:{ejemplo:payload}});
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
