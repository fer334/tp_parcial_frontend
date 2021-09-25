import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

// import { Horario } from '../model/horario';
// import { HorarioService } from '../service/horario.service';

import { Subject } from 'rxjs';
import swal from 'sweetalert2';
import { Servicio } from '../model/servicio';
import { ServicioService } from '../service/servicio.service';

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
      headerRow: ['Fecha','Id Ficha','Fecha ficha','Profesional','Cliente','Categoria','Subcategoria', 'Actions'],
      footerRow: ['Fecha','Id Ficha','Fecha ficha','Profesional','Cliente','Categoria','Subcategoria', 'Actions'],
      dataRows: [],
    };

    this.servicioService.getAll().subscribe(
      (entity) => {
        this.data = entity.lista;
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
}
