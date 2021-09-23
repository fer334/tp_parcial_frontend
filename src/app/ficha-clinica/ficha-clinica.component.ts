import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FichaClinica } from '../model/ficha-clinica';
import { ServicefichaclinicaService } from '../service/servicefichaclinica.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit, AfterViewInit, OnDestroy {
  fichasclinicas: FichaClinica[] = [];
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private servicioFichaClinica: ServicefichaclinicaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getFichasClinicas();

    //actualmente se imprimen en consola estas listas
    this.getFichasClinicasPorFisioterapeuta();
    this.getFichasClinicasPorPaciente();
    this.getFichasClinicasPorFechaDesde();
    this.getFichasClinicasPorFechaHasta();
    this.getFichasClinicasPorFechaDesdeHasta();
    this.getFichasClinicasPorIdTipoProducto();

    //propiedades de las tablas
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'Todos'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Buscar Fichas',
      },
    };
    this.dataTable = {
      headerRow: ['Id(No)','Fecha y Hora','Profesional','Cliente','Categoria','Sub-Categoria','Motivo de Consulta(No)','Observación(No)','Diagnostico(No)','Acciones'],
      footerRow: ['Id(No)','Fecha y Hora','Profesional','Cliente','Categoria','Sub-Categoria','Motivo de Consulta(No)','Observación(No)','Diagnostico(No)','Acciones'],
      dataRows: [],
    };

  }

  public dataTable: DataTable;
  
  edit(fc: FichaClinica){
    this.router.navigate(['editarficha_clinica/',fc.idFichaClinica]);
  }
  getFichasClinicas(): void {
    this.servicioFichaClinica.getFichasClinicas().subscribe(
      entity =>{ 
        this.fichasclinicas = entity.lista;
        this.dtTrigger.next();
      },
      error => console.log('no se pueden conseguir las fichas clinicas')
    );
  }

  getFichasClinicasPorFisioterapeuta(): void{ //por ahora dejamos el id 2 para probar
    this.servicioFichaClinica.getFichasClinicasPorFisioterapeuta(2).subscribe(
      entity => console.log('lista por terapeuta: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por id 2 de terapeuta')
    )
  }

  getFichasClinicasPorPaciente(): void{ //por ahora dejamos el id 97 para probar
    this.servicioFichaClinica.getFichasClinicasPorPaciente(97).subscribe(
      entity => console.log('lista por paciente: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por id 97 de paciente')
    )
  }

  getFichasClinicasPorFechaDesde(): void{ //todos los registros están en null en este campo
    this.servicioFichaClinica.getFichasClinicasPorFechaDesde(null).subscribe(
      entity => console.log('lista por fechaDesde: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por fechaDesde')
    )
  }

  getFichasClinicasPorFechaHasta(): void{ //puse un formato de ejemplo pero todos los valores están en null
    this.servicioFichaClinica.getFichasClinicasPorFechaHasta('20190901').subscribe(
      entity => console.log('lista por fechaHasta: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por fechaHasta')
    )
  }

  getFichasClinicasPorFechaDesdeHasta(): void{ //combinación de ambos anteriores
    this.servicioFichaClinica.getFichasClinicasPorFechaDesdeHasta('20190901','20190901').subscribe(
      entity => console.log('lista por fechaDesdeHasta: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por fechaDesdeHasta')
    )
  }
  
  // (para este campo lógicamente antes hay que filtrar por categoria). A que se refiere esto??
  getFichasClinicasPorIdTipoProducto(): void{ //filtrar por subcategoria. Para el ejemplo id 38 
    this.servicioFichaClinica.getFichasClinicasPorSubcategoria(38).subscribe(
      entity => console.log('lista por subcategoria: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por subcategoria')
    )
  }
    
  ngAfterViewInit() {}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
