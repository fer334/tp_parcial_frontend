import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];

}

@Component({
  selector: 'app-reserva-agregar',
  templateUrl: './reserva-agregar.component.html',
  styleUrls: ['./reserva-agregar.component.css']
})
export class ReservaAgregarComponent implements OnInit {

  constructor(
    private reservaService:ReservaService,
    private routeNavigation:Router,
    private loginService:LoginService
    ) { }
    //states
    reservas:Reserva[]=[]
    timeSelected:string=""
    mensaje:string=""
    idEmpleado:number=Number(localStorage.getItem("idUser"))
    idCliente:number
    observacion:string=null
    showAll:boolean
    dateFilter:Date
    fisioterapeutas:any
    clientes:any
    selectedSchedule:string[]=[]


    public dataTable: DataTable;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;


    ngOnInit(): void {
        //this.fetchAgendaLibreOcupada()
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
          headerRow: [ 'Hora Inicio','Hora Fin', 'Cliente', 'Seleccionar' ],
          footerRow: [ 'Hora Inicio','Hora Fin', 'Cliente', 'Seleccionar' ],
          dataRows: []
        }
        this.loginService.isLogged()
        this.fetchFisioterapeutas()
        this.fetchPersona()
        this.reservas=[]
        this.dtTrigger.next();
        console.log('empleado',this.idEmpleado)
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  buscar():void{
    if(!this.dateFilter)return
    console.log("Buscandoo...",this.dateFilter)
    if(this.showAll) this.fetchAgendaLibreOcupada()
    else this.fetchAgendaLibre()
  }

  

  fetchAgendaLibreOcupada():void{
      this.reservaService.getAgendaLibreOcupado(this.idEmpleado,formatDate(this.dateFilter,'yyyyMMdd','en-US')).subscribe(
          response=>{

            this.reservas=response
            console.log("Response",this.reservas)
            this.rerender()
          },
          error=>console.log("Error",error)
      )
  }
  fetchAgendaLibre():void{
    this.reservaService.getAgendaLibre(this.idEmpleado,formatDate(this.dateFilter,'yyyyMMdd','en-US')).subscribe(
      response=>{

        this.reservas=response
        console.log("Response",this.reservas)
        this.rerender()

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
  getFisioSelected(){
    let f= this.fisioterapeutas.lista.find((item)=>item.idPersona==this.idEmpleado)
    return `${f.nombre} ${f.apellido}`
  }
  goBack(): void{
    setTimeout(()=>{
      this.routeNavigation.navigate(['/reserva'])
    },1)
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
            this.showSwall(true,"Creado","Se agrego la reserva exitosamente")
            
          },error=>{
            console.log("Error")
            this.showSwall(false,"Error","No se pudo crear la reserva, intentelo mas tarde")

          }

      )
    }

  choose(value:string):void{
    this.selectedSchedule=[]
    this.timeSelected=value;
    console.log('valuee',this.timeSelected)
    let reservaSelected=this.reservas.find((item)=>item.horaInicioCadena==this.timeSelected)
    this.selectedSchedule.push(reservaSelected.horaInicioCadena,reservaSelected.horaFinCadena)
  }

  showSwall(type:boolean,title:string,text:string){
    if(type){
        swal.fire({
          title: title,
          text: text,
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-success",
          },
          icon: "success"
      }).then((result)=>{
        if(result.isConfirmed) this.goBack()
        else this.goBack()
      });
  }else{
      swal.fire({
        title: title,
        text: text,
        buttonsStyling: false,
        customClass:{
          confirmButton: "btn btn-info"
        }
      }).then(()=>this.goBack())
    }
  }
}
