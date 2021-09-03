import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/servicepaciente.service';

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
export class PacienteComponent implements OnInit, AfterViewInit {
  pacientes: Paciente[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>(); 

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
    }
    this.dataTable = {
      headerRow: ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Actions'],
      footerRow: ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Actions'],
      dataRows: [],
    };

    this.servicioPaciente.getPacientes().subscribe(
      (entity) => {
        this.pacientes = entity.lista;
        const data: string[][] = [];
        for (const fil of this.pacientes) {
          const aux = [];
          for (const col in fil) {
            aux.push(fil[col]);
          }
          data.push(aux);
        }
        this.dataTable.dataRows = data;
        this.dtTrigger.next();
      },
      (error) => console.log('no se pudieron conseguir los paises')
    );
  }

  public dataTable: DataTable;

  ngAfterViewInit() {}

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
    const toDelete = this.pacientes.findIndex(x=>x.idPersona==e.idPersona)
    this.pacientes.splice(toDelete,1)
    console.log('clicked',e);
  }
}
