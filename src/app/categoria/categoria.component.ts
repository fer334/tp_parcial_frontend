import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Categoria } from '../model/categoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit, OnDestroy {
  categorias: Categoria[] = []; 

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private ServicioCategoria: ServicecategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'Todos'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Buscar Categorias',
      },
    };
    this.dataTable = {
      headerRow: ['Id', 'Descripción', 'Acciones'],
      footerRow: ['Id', 'Descripción', 'Acciones'],
      dataRows: [],
    };

    this.ServicioCategoria.getCategorias().subscribe(
      entity => {
        this.categorias = entity.lista;
        this.dtTrigger.next();},
      error => console.log('no se han podido conseguir las categorias')
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

  edit(c: Categoria){
    this.router.navigate(['editarcategoria/',c.idCategoria]);
  }
  delete(c: Categoria){
    this.router.navigate(['borrarcategoria/',c.idCategoria]);
  }
}
