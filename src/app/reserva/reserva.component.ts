import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva/reserva.service';
import { Reserva } from '../model/reserva';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[]=[]
  fromDate: Date
  toDate:Date
  empleado:String
  cliente:String
  reservasFiltradas:Reserva[]=[]

  constructor(private reservaService: ReservaService
    ) { }

  ngOnInit(): void {
    this.fetchReservas()

  } 

  fetchReservas():void {
    this.reservaService.getReservas().subscribe(
      entity=>{
        this.reservas=entity.lista  
        this.filtrarReservasByDate(Date.now())
      },
      error=>console.log("error",error)
    )
  }

  filtrarReservasByDate(date:any): void{
      console.log("Reservas",this.reservas)
      this.reservasFiltradas=this.reservas.filter(item=>item.fechaCadena==formatDate(date,'yyyyMMdd','en-US'))
      console.log('filtradas,',this.reservasFiltradas)
  }
  filtrarReservas():void{
      this.reservasFiltradas=[]
      this.filtrarReservasByRange();
      this.filtrarReservaByEmpleado();
      this.filtrarReservaByCliente();
      this.removeDuplicate();
  }
  removeDuplicate():void{
    let unique={}
    let aux=this.reservasFiltradas
    this.reservasFiltradas=aux.filter(obj=> !unique[obj.idReserva] && (unique[obj.idReserva]=true) )
  }
  filtrarReservasByRange():void{
    console.log(this.fromDate,this.toDate)
    if(this.fromDate && this.toDate){
        let from =formatDate(this.fromDate,'yyyyMMdd','en-US');
        let to=formatDate(this.toDate,'yyyyMMdd','en-US');
        this.reservasFiltradas=this.reservasFiltradas.concat(this.reservas.filter( item=> item.fechaCadena>=from && item.fechaCadena<=to ))
    }
    this.fromDate=this.toDate=null
  }
  filtrarReservaByEmpleado():void{
    if(this.empleado){
      this.reservasFiltradas=this.reservasFiltradas.concat(this.reservas.filter(item=>item.idEmpleado.nombre.toLowerCase().startsWith(this.empleado+"".toLocaleLowerCase())))
    }
    this.empleado=""
  }
  getAll():void{
    this.reservasFiltradas=[...this.reservas]
  }
  filtrarReservaByCliente():void{
    if(this.cliente){
      this.reservasFiltradas=this.reservasFiltradas.concat(this.reservas.filter(item=>item.idCliente.nombre.toLowerCase().startsWith(this.cliente+"".toLowerCase())))
    }
    this.cliente=""
  }
  
}
