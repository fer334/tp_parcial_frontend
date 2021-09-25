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

  getReserva(idReserva:number):Observable<Reserva>{
    let resource=`stock-pwfe/reserva/${idReserva}`
    let endPoint=this.api+resource
    return this.http.get<Reserva>(endPoint)
  }
  cancelarReserva(idReserva:number): Observable<number>{
    let resource=`stock-pwfe/reserva/${idReserva}`
    let endPoint=this.api+resource 
    return this.http.delete<number>(endPoint)
  }

  updateReserva(reserva): Observable<Reserva>{
    let resource="stock-pwfe/reserva"
    let endPoint=this.api+resource
    console.log("Reserva a actualizar",reserva)
    return this.http.put<Reserva>(endPoint,JSON.stringify(reserva),{headers:{'Content-Type': 'application/json'}})
  }

  crearReserva(reserva:any): Observable<Reserva>{
    let resource="stock-pwfe/reserva"
    let endPoint=this.api+resource
    console.log("newReserva",JSON.stringify(reserva))
    return this.http.post<Reserva>(endPoint,JSON.stringify(reserva),{headers:{'Content-Type': 'application/json','usuario':'usuario2'}})
  }

  getAgendaLibre(idEmpleado:number,fecha:string):Observable<Reserva[]>{
    let resource=`stock-pwfe/persona/${idEmpleado}/agenda`
    let endPoint=this.api+resource
    return this.http.get<Reserva[]>(endPoint,{params:{
      fecha:fecha,
      disponible:"S"
    }})
  }

  getAgendaLibreOcupado(idEmpleado:number,fecha:string):Observable<Reserva[]>{
    let resource=`stock-pwfe/persona/${idEmpleado}/agenda`
    let endPoint=this.api+resource
    return this.http.get<Reserva[]>(endPoint,{params:{
      fecha:fecha
    }})
  }

  getEmpleados(){
    let resource="stock-pwfe/persona"
    let endPoint=this.api+resource
    return this.http.get(endPoint,{params:{
      ejemplo:JSON.stringify({soloUsuariosDelSistema:true})
    }})
  }
  getClientes(){
    let resource="stock-pwfe/persona"
    let endPoint=this.api+resource
    return this.http.get(endPoint)
  }
}
