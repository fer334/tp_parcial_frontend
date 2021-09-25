import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../model/datos';
import { Horario } from '../model/horario';

@Injectable({
  providedIn: 'root',
})
export class HorarioExService {
  private api: string = 'http://181.123.243.5:8080/stock-pwfe/horarioExcepcion';

  constructor(private http: HttpClient) {}

  getPaciente(id: number): Observable<Horario> {
    throw new Error('Method not implemented.');
    // return this.http.get<Horario>(this.api + '/' + id);
  }

  getHorarios(): Observable<listadatos<Horario>> {
    return this.http.get<listadatos<Horario>>(this.api);
  }
  
  createHorario(data: Horario): Observable<Horario> {
    // const h2: Horario = JSON.parse(JSON.stringify(p));
    // h2.horaAperturaCadena = h.horaAperturaCadena
    // h2.horaCierreCadena = h.horaCierreCadena
      // ? formatDate(p.fechaNacimiento, 'yyyy-mm-dd hh:mm:ss', 'en-US')
      // : null;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'usuario': 'usuario2'
      });
      
    return this.http.post<Horario>(this.api, data,{ headers: headers}).pipe(
      tap(
        // Log the result or error
        (data) => console.log('agregado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }

  // delPaciente(id: number): Observable<Horario> {
  //   console.log('delPaciente', this.api + '/' + id);

  //   return this.http.delete<Horario>(this.api + '/' + id);
  // }
  // }

  // updatePaciente(p: Paciente): Observable<Horario> {
  //   const p2: Paciente = JSON.parse(JSON.stringify(p));
  //   p2.fechaNacimiento = p.fechaNacimiento
  //     ? formatDate(p.fechaNacimiento, 'yyyy-mm-dd hh:mm:ss', 'en-US')
  //     : null;

  //   return this.http.put<Horario>(this.api, p2).pipe(
  //     tap(
  //       // Log the result or error
  //       (data) => console.log('modificado ' + data),
  //       (error) => console.log('error: ' + error)
  //     )
  //   );
  // }
}
