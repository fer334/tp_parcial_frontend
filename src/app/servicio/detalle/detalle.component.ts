import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
  
import { Subject } from 'rxjs';
import { Detalle } from 'src/app/model/detalle';
import { ServicioService } from 'src/app/service/servicio.service';
import { formatDate } from '@angular/common';
  
// import { Horario } from '../model/horario';
// import { HorarioService } from '../service/horario.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, AfterViewInit, OnDestroy {
    detalles: Detalle[] = [];
    idCliente: number;
    idEmpleado: number;
    fechadesde: string;
    fechahasta: string;
    idPresentacionProducto: number;
  
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
  
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
        headerRow: ['Fecha','Profesional','Cliente','Precio Unitario','Cantidad','Total del detalle','Presentación del producto'],
        footerRow: ['Fecha','Profesional','Cliente','Precio Unitario','Cantidad','Total del detalle','Presentación del producto'],
        dataRows: [],
      };
    }
  
    public dataTable: DataTable;

    filtrarDetalles(): void{
        // let desde =formatDate(this.fechadesde,'yyyyMMdd','en-US');
        // let hasta=formatDate(this.fechahasta,'yyyyMMdd','en-US');  
    //{ "idServicio": { "idFichaClinica":{ "idCliente":{ "idPersona":90 } }, "idEmpleado":{ "idPersona":2 }, "fechaDesdeCadena":null, "fechaHastaCadena":null }, "idPresentacionProducto": { "idPresentacionProducto":334} }
        this.servicioService.getDetalles(this.idCliente, this.idEmpleado, null, null, this.idPresentacionProducto).subscribe(
          (entity) => {
            this.detalles = entity.lista;
            this.dtTrigger.next();
          },
          (error) => console.log('no se pudieron conseguir los detalles ',error.error)
        );
    }
  
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
  }  
