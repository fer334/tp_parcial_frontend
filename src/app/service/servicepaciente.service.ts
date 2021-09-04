import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {listadatos} from "../model/datos";
import {Paciente} from "../model/paciente";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona"; 

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<listadatos<Paciente>> {
    return this.http.get<listadatos<Paciente>>(this.api);
  }

  delPaciente(id: number): Observable<Paciente> {
    console.log('delPaciente',this.api + "/" + id);
    
    return this.http.delete<Paciente>(this.api + "/" + id);
  }

  createPaciente(p:Paciente): Observable<Paciente> {
    const p2: Paciente = JSON.parse(JSON.stringify(p));
    p2.fechaNacimiento = p.fechaNacimiento?formatDate(p.fechaNacimiento, 'yyyy-mm-dd hh:mm:ss', 'en-US'):null;

    return this.http
      .post<Paciente>(this.api, p2)
      .pipe(
        tap( // Log the result or error
          data => console.log('agregado '+data),
          error => console.log("error: "+error)
        )
      );
  }


}
