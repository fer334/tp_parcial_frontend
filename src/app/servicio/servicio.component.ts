import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

// import { Horario } from '../model/horario';
// import { HorarioService } from '../service/horario.service';

import { Subject } from 'rxjs';
import swal from 'sweetalert2';
import { Servicio } from '../model/servicio';
import { ServicioService } from '../service/servicio.service';
import { Paciente } from '../model/paciente';
import { formatDate } from '@angular/common';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
})
export class ServicioComponent implements OnInit, AfterViewInit, OnDestroy {
  data: Servicio[] = [];
  dias = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  cliente: Paciente;
  empleado: Paciente
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  filterData: Servicio[];
  fromDate: any;
  toDate: any;

  constructor(private servicioService: ServicioService, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      },
    };
    this.dataTable = {
      headerRow: ['Fecha','Id Ficha','Fecha ficha','Profesional','Cliente','Categoria','Subcategoria', 'Actions'],
      footerRow: ['Fecha','Id Ficha','Fecha ficha','Profesional','Cliente','Categoria','Subcategoria', 'Actions'],
      dataRows: [],
    };

    this.servicioService.getAll().subscribe(
      (entity) => {
        this.data = entity.lista;
        this.filterData = this.data;
        this.dtTrigger.next();
      },
      (error) => console.log('no se pudieron conseguir los servicios')
    );
  }

  public dataTable: DataTable;

  ngAfterViewInit() {}

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

  foo(e) {
    console.log('ea', e)
    this.router.navigate(['/detalle/',e.idServicio]);
  }

  edit(p: Servicio) {
    throw new Error('Method not implemented.');
    // this.router.navigate(['/paciente/edit/', p.idPersona]);
  }

  close(e: Servicio) {
    throw new Error('Method not implemented.');

    // const deleteOk = () => {
    //   const toDelete = this.pacientes.findIndex(
    //     (x) => x.idPersona == e.idPersona
    //   );
    //   this.pacientes.splice(toDelete, 1);

    //   this.rerender();

    //   swal.fire({
    //     title: 'Deleted!',
    //     text: 'Your register has been deleted.',
    //     icon: 'success',
    //     customClass: {
    //       confirmButton: 'btn btn-success',
    //     },
    //     buttonsStyling: false,
    //   });
    // };
    
    // const deleteError = (error) => {
    //   //first letter in uppercase
    //   const errorMessage =
    //     error.error.charAt(0).toUpperCase() + error.error.slice(1) + '.';
    //   swal.fire({
    //     title: 'Error!',
    //     text: errorMessage,
    //     icon: 'error',
    //     customClass: {
    //       confirmButton: 'btn btn-success',
    //     },
    //     buttonsStyling: false,
    //   });
    // };

    // const tryDelete = () => {
    //   this.horarioService.delPaciente(e.idPersona).subscribe(
    //     (entity) => {
    //       deleteOk();
    //     },
    //     (error) => {
    //       console.log(error);
    //       deleteError(error);
    //     }
    //   );
    // };

    // swal
    //   .fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     customClass: {
    //       confirmButton: 'btn btn-success',
    //       cancelButton: 'btn btn-danger',
    //     },
    //     confirmButtonText: 'Yes, delete it!',
    //     buttonsStyling: false,
    //   })
    //   .then((result) => {
    //     if (result.value) {
    //       tryDelete();
    //     }
    //   });
  }
  filtrarByDate(date:any): void{
    console.log("Reservas",this.data)
    this.filterData=this.data.filter(item=>item.fechaCadena==formatDate(date,'yyyyMMdd','en-US'))
    console.log('filtradas,',this.filterData)
  }
  filtrar():void{
      // this.filtreFinished=false
      this.filtrarByRange();
      this.filtrarByEmpleado();
      this.filtrarByCliente();
      this.removeDuplicate();
      // this.filtreFinished=true
      console.log('filtradas,',this.filterData);
      
      this.rerender()
  }

  removeDuplicate():void{
    let unique={}
    this.filterData = this.filterData.filter(obj=> !unique[obj.idServicio] && (unique[obj.idServicio]=true) )
  }

  filtrarByRange():void{
    if(this.fromDate && this.toDate){
        let from =formatDate(this.fromDate,'yyyyMMdd','en-US');
        let to=formatDate(this.toDate,'yyyyMMdd','en-US');
        console.log(from,to)
        this.filterData=this.filterData.concat(this.data.filter(item=> item.fechaCadena>=from && item.fechaCadena<=to ))
    }
  }
  filtrarByEmpleado():void{
    console.log('lenE',this.filterData.length)
    if(this.empleado){
      this.filterData = this.filterData.filter(item=>item.idFichaClinica.idEmpleado.nombre.toLowerCase().startsWith((this.empleado+"").toLocaleLowerCase())) 
    }
  }
  resetField(){
    this.fromDate=this.toDate=this.empleado=this.cliente=null
  }
  getAll():void{
    this.filterData=[...this.data]
    this.rerender()
  }
  filtrarByCliente():void{
    console.log('filterData',this.filterData)
    if(this.cliente){
      // console.log(this.filterData.filter(item=>item.idFichaClinica.idCliente.nombre.toLowerCase().startsWith((this.cliente+"").toLowerCase())) );
      this.filterData = this.filterData.filter(item=>item.idFichaClinica.idCliente.nombre.toLowerCase().startsWith((this.cliente+"").toLowerCase())) 
    }
  }
}
