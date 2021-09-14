import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reserva-agregar',
  templateUrl: './reserva-agregar.component.html',
  styleUrls: ['./reserva-agregar.component.css']
})
export class ReservaAgregarComponent implements OnInit {

  constructor(
    private reservaService:ReservaService,
    private routeNavigation:Router
    ) { }

  ngOnInit(): void {
    //this.fetchAgendaLibreOcupada()
    this.fetchFisioterapeutas()
    this.fetchPersona()
  }

  buscar():void{
    if(!this.dateFilter)return
    console.log("Buscandoo...",this.dateFilter)
    if(this.showAll) this.fetchAgendaLibreOcupada()
    else this.fetchAgendaLibre()
  }

  //states
  reservas:Reserva[]=[]
  timeSelected:string=""
  mensaje:string=""
  idEmpleado:number=2
  idCliente:number=1
  observacion:string=""
  showAll:boolean
  dateFilter:Date
  fisioterapeutas:any
  clientes:any

  fetchAgendaLibreOcupada():void{
      this.reservaService.getAgendaLibreOcupado(this.idEmpleado,formatDate(this.dateFilter,'yyyyMMdd','en-US')).subscribe(
          response=>{

            this.reservas=response
            console.log("Response",this.reservas)
          },
          error=>console.log("Error",error)
      )
  }
  fetchAgendaLibre():void{
    this.reservaService.getAgendaLibre(this.idEmpleado,formatDate(this.dateFilter,'yyyyMMdd','en-US')).subscribe(
      response=>{

        this.reservas=response
        console.log("Response",this.reservas)
      },
      error=>console.log("Error",error)
  )
  }
  fetchFisioterapeutas(){
    this.reservaService.getEmpleados().subscribe(
      entity=>{
          this.fisioterapeutas=entity
          console.log("fisioos",this.fisioterapeutas)
      },error=>{
        console.log("error",error)
      }
    )
  }

  fetchPersona():void{
    this.reservaService.getClientes().subscribe(
      response=>{
          this.clientes=response;
      }
    )
  }

  goBack(): void{
    setTimeout(()=>{
      this.routeNavigation.navigate(['/reserva'])
    },1000)
  }
  removeProperties(obj:any ,props:string []):void {
      for(let prop of props){
          (prop in obj) && (delete obj[prop])
      }
  }
  agregarReserva():void{
      if(!this.timeSelected) return
      let reservaSelected=this.reservas.find((item)=>item.horaInicioCadena==this.timeSelected)
      this.removeProperties(reservaSelected,['idReserva','horaInicio','horaFin'])
      let newReserva ={ ...reservaSelected,idCliente:{idPersona:this.idCliente},idEmpleado:{idPersona:this.idEmpleado},observacion:this.observacion}

      this.reservaService.crearReserva(newReserva).subscribe(
          response=>{
            console.log("Se creoo")
            this.mensaje="Se agrego la reserva exitosamente"
            this.goBack()
          },error=>{
            console.log("Error")
            this.mensaje="No se pudo Registrar su Reserva"
            this.goBack()
          }

      )
    }

  choose(value:string):void{
    console.log('valuee',value)
    this.timeSelected=value;
    console.log('valuee',this.timeSelected)
  }
}
