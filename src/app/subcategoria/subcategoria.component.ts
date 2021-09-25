import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Subcategoria } from '../model/subcategoria';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit, AfterViewInit, OnDestroy {
  subcategorias: Subcategoria[] = []; 

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  
  constructor( private servicioSubcategoria: ServicesubcategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //cargar lista de subcategorias
    this.servicioSubcategoria.getSubcategorias().subscribe(
      entity =>{ 
        this.subcategorias = entity.lista;
        this.dtTrigger.next();
      },
      error => console.log('no se pudieron conseguir las subcategorias')
    );

    //imprimimos las funciones extra en consola
    this.getSubcategoriaPorId();
    this.getSubcategoriaPorDescripcion();
    this.getSubcategoriaPorIdCategoria();

    //configuraciones de la tabla
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Buscar Subcategorias',
      },
    };
    this.dataTable = {
      headerRow: ['Id', 'Descripción', 'Categoría', 'Acciones'],
      footerRow: ['Id', 'Descripción', 'Categoría', 'Acciones'],
      dataRows: [],
    };
  }

  public dataTable: DataTable;

  edit(sc: Subcategoria){
    this.router.navigate(['editarsubcategoria/',sc.idTipoProducto]);
  }
  delete(sc: Subcategoria){
    this.router.navigate(['borrarsubcategoria/',sc.idTipoProducto]);
  }

  getSubcategoriaPorId(): void { //para el ejemplo se consulta por la subcategoria con id 46
    this.servicioSubcategoria.getSubcategoriaPorId(46).subscribe(
      entity => console.log("subcategoria con id 46 ("+entity.idTipoProducto+") "+entity.descripcion),
      error => console.log("error al traer subcategoria con id 46")
    );
  }

  getSubcategoriaPorDescripcion(): void { //traer lista de subcategorias que tengan esta descripcion
    this.servicioSubcategoria.getSubcategoriasPorDescripcion("subcategoria2").subscribe(
      entity => console.log("lista de subcategorias con descripcion subcategoria2 "+entity.lista+ " ["+ entity.totalDatos +"] elementos"),
      error => console.log('no se pudieron conseguir las subcategorias')
    );
  }

  getSubcategoriaPorIdCategoria(): void { //traer lista de subcategorias que tengan este idcategoria
    this.servicioSubcategoria.getSubcategoriasPorIdCategoria(3).subscribe(
      entity => console.log("lista de subcategorias con categoria de id 3: "+entity.lista+ " ["+ entity.totalDatos +"] elementos"),
      error => console.log('no se pudieron conseguir las subcategorias')
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
