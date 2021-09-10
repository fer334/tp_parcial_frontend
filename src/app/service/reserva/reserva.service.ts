import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { listadatos } from 'src/app/model/datos';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/model/reserva';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private api:String= environment.url_api
  constructor(private http:HttpClient) { }

  getReservas():Observable<listadatos<Reserva>>{
    let resource="stock-pwfe/reserva"
    let endPoint=this.api+resource
    return this.http.get<listadatos<Reserva>>(endPoint)
  } 

  cancelarReserva(): Observable<number>{
    let resource="stock-pwfe/reserva"
    let endPoint=this.api+resource 
    return this.http.delete<number>(endPoint)
  }

  updateReserva(reserva:Reserva): Observable<Reserva>{
    let resource="stock-pwfe/reserva"
    let endPoint=this.api+resource
    return this.http.put<Reserva>(endPoint,reserva)
  }

  crearReserva(reserva:Reserva): Observable<Reserva>{
    let resource="stock-pwfe/reserva"
    let endPoint=this.api+resource
    return this.http.post<Reserva>(endPoint,reserva)
  }
}
