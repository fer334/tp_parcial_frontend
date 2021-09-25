import { Component, OnInit,ViewChild } from '@angular/core';
import { ReservaService } from '../service/reserva/reserva.service';
import { Reserva } from '../model/reserva';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { LoginService } from '../service/login/login.service';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];

}
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
  filtreFinished:boolean=true

  public dataTable: DataTable;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private reservaService: ReservaService,
              private loginService : LoginService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [5, 25, 50, -1],
        [5, 25, 50, 'All'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      },
    };
    this.dataTable = {
      headerRow: [ 'Id', 'Fecha', 'HoraInicio', 'HoraFin', 'Empleado', 'Cliente','Asistio','Observacion','Estado','Accion' ],
      footerRow: [ 'Id', 'Fecha', 'HoraInicio', 'HoraFin', 'Empleado', 'Cliente','Asistio','Observacion','Estado','Accion' ],
      dataRows: []
    }
    this.loginService.isLogged()
    this.fetchReservas()
    

  } 


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  fetchReservas():void {
    this.reservaService.getReservas().subscribe(
      entity=>{
        this.reservas=entity.lista  
        this.filtrarReservasByDate(Date.now())
        this.dtTrigger.next();
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
      this.filtreFinished=false
      this.filtrarReservasByRange();
      this.filtrarReservaByEmpleado();
      this.filtrarReservaByCliente();
      this.removeDuplicate();
      this.filtreFinished=true
      this.rerender()
  }
  removeDuplicate():void{
    let unique={}
    this.reservasFiltradas=this.reservasFiltradas.filter(obj=> !unique[obj.idReserva] && (unique[obj.idReserva]=true) )
  }
  filtrarReservasByRange():void{
    if(this.fromDate && this.toDate){
        let from =formatDate(this.fromDate,'yyyyMMdd','en-US');
        let to=formatDate(this.toDate,'yyyyMMdd','en-US');
        console.log(from,to)
        this.reservasFiltradas=this.reservasFiltradas.concat(this.reservas.filter(item=> item.fechaCadena>=from && item.fechaCadena<=to ))
    }
  }
  filtrarReservaByEmpleado():void{
    console.log('lenE',this.reservasFiltradas.length)
    if(this.empleado){
      this.reservasFiltradas= this.reservasFiltradas.length!=0 ? this.reservasFiltradas.filter(item=>item.idEmpleado.nombre.toLowerCase().startsWith((this.empleado+"").toLocaleLowerCase())) :this.reservas.filter(item=>item.idEmpleado.nombre.toLowerCase().startsWith((this.empleado+"").toLocaleLowerCase()))
    }
  }
  resetField(){
    this.fromDate=this.toDate=this.empleado=this.cliente=null
  }
  getAll():void{
    this.reservasFiltradas=[...this.reservas]
    this.rerender()
  }
  filtrarReservaByCliente():void{
    console.log('lenC',this.reservasFiltradas.length)
    if(this.cliente){
      this.reservasFiltradas= this.reservasFiltradas.length>0 ? this.reservasFiltradas.filter(item=>item.idCliente.nombre.toLowerCase().startsWith((this.cliente+"").toLowerCase())) : this.reservas.filter(item=>item.idCliente.nombre.toLowerCase().startsWith((this.cliente+"").toLowerCase()))
    }
  }
  
}
