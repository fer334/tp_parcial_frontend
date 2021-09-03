import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/servicepaciente.service';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit, AfterViewInit, OnDestroy {
  pacientes: Paciente[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private servicioPaciente: PacienteService) {}

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
      headerRow: ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Actions'],
      footerRow: ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Actions'],
      dataRows: [],
    };

    this.servicioPaciente.getPacientes().subscribe(
      (entity) => {
        this.pacientes = entity.lista;
        this.dtTrigger.next();
      },
      (error) => console.log('no se pudieron conseguir los paises')
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

  lindo() {
    return JSON.stringify(this.pacientes);
  }
  fav() {
    console.log('clicked');
  }
  drv() {
    console.log('clicked');
  }

  close(e: Paciente) {
    const deleteOk = () => {
      const toDelete = this.pacientes.findIndex(
        (x) => x.idPersona == e.idPersona
      );
      this.pacientes.splice(toDelete, 1);

      this.rerender();

      swal.fire({
        title: 'Deleted!',
        text: 'Your register has been deleted.',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      });
    };
    
    const deleteError = (error) => {
      //first letter in uppercase
      const errorMessage =
        error.error.charAt(0).toUpperCase() + error.error.slice(1) + '.';
      swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      });
    };

    const tryDelete = () => {
      this.servicioPaciente.delPaciente(e.idPersona).subscribe(
        (entity) => {
          deleteOk();
        },
        (error) => {
          console.log(error);
          deleteError(error);
        }
      );
    };

    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          tryDelete();
        }
      });
  }
}
