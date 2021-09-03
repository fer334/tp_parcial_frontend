import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {listadatos} from "../model/datos";
import {Paciente} from "../model/paciente";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona"; 

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<listadatos<Paciente>> {
    return this.http.get<listadatos<Paciente>>(this.api);
  }

}
