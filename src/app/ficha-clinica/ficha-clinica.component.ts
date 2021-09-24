import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Categoria } from '../model/categoria';
import { FichaClinica } from '../model/ficha-clinica';
import { Subcategoria } from '../model/subcategoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicefichaclinicaService } from '../service/servicefichaclinica.service';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';

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
  fichasfiltradas: FichaClinica[] = [];
  //valores para filtrar
  pacienteId: number;
  fisioterapeutaId: number;
  fechaDesde: Date;
  fechaHasta: Date;
  idCategoria: number;
  idSubcategoria: number;
  filtreFinished:boolean=true;

  //listas extra
  categorias: Categoria[]= [];
  subcategorias: Subcategoria[]= [];
  subcategoriasfiltradas: Subcategoria[] = [];

  //elementos de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private servicioFichaClinica: ServicefichaclinicaService,
    private servicioCategoria: ServicecategoriaService,
    private servicioSubcategoria: ServicesubcategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getFichasClinicas();
    
    this.traerCategorias();
    this.traerSubCategorias();
    //actualmente se imprimen en consola estas listas
    // this.getFichasClinicasPorFisioterapeuta();
    // this.getFichasClinicasPorPaciente();
    // this.getFichasClinicasPorFechaDesde();
    // this.getFichasClinicasPorFechaHasta();
    // this.getFichasClinicasPorFechaDesdeHasta();
    // this.getFichasClinicasPorIdTipoProducto();

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
        this.fichasfiltradas = entity.lista;
        this.dtTrigger.next();
      },
      error => console.log('no se pueden conseguir las fichas clinicas')
    );
  }

  filtrarFichasClinicas(): void {
    this.fichasfiltradas = [];
    this.filtreFinished=false
    this.getFichasClinicasPorFisioterapeuta();
    this.getFichasClinicasPorPaciente();
    this.getFichasClinicasPorFechaDesdeHasta();
    this.getFichasClinicasPorIdCategoria();
    this.getFichasClinicasPorIdTipoProducto();
    this.removeDuplicate();
    this.filtreFinished=true;
    console.log('lista filtrada: '+this.fichasfiltradas);
  }
  
  removeDuplicate():void{
    let unique={}
    this.fichasfiltradas=this.fichasfiltradas.filter(obj=> !unique[obj.idFichaClinica] && (unique[obj.idFichaClinica]=true) )
  }

  getFichasClinicasPorFisioterapeuta(): void{ //por ahora dejamos el id 2 para probar
    if (this.fisioterapeutaId) {
      this.servicioFichaClinica.getFichasClinicasPorFisioterapeuta(this.fisioterapeutaId).subscribe(
        entity =>{ console.log('lista por terapeuta: ',entity.lista,' elementos: ',entity.totalDatos)
          this.fichasfiltradas.concat(entity.lista);
      },
        error => console.log('no se puede filtrar las fichas por id 2 de terapeuta')
      )
    }
  }

  getFichasClinicasPorPaciente(): void{ //por ahora dejamos el id 97 para probar
    if (this.pacienteId) {
      // this.servicioFichaClinica.getFichasClinicasPorPaciente(this.pacienteId).subscribe(
      //   entity =>{ console.log('lista por paciente: ',entity.lista,' elementos: ',entity.totalDatos)
      //     this.fichasfiltradas.concat(entity.lista);
      // },
      //   error => console.log('no se puede filtrar las fichas por id de paciente')
      // )
     this.fichasfiltradas = this.fichasclinicas.filter(item=>item.idCliente.idPersona == this.pacienteId) 
    }
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
    if (this.fechaDesde && this.fechaHasta) {
      let desde =formatDate(this.fechaDesde,'yyyyMMdd','en-US');
      let hasta=formatDate(this.fechaHasta,'yyyyMMdd','en-US');  
      this.servicioFichaClinica.getFichasClinicasPorFechaDesdeHasta(desde,hasta).subscribe(
        entity =>{ console.log('lista por fechaDesdeHasta: ',entity.lista,' elementos: ',entity.totalDatos)
          this.fichasfiltradas.concat(entity.lista);
      },
        error => console.log('no se puede filtrar las fichas por fechaDesdeHasta')
      )
      
    }
  }
  
  // (para este campo lógicamente antes hay que filtrar por categoria). A que se refiere esto??
  getFichasClinicasPorIdTipoProducto(): void{ //filtrar por subcategoria. Para el ejemplo id 38 
    if (this.idSubcategoria) {
      this.servicioFichaClinica.getFichasClinicasPorSubcategoria(this.idSubcategoria).subscribe(
        entity =>{ console.log('lista por subcategoria: ',entity.lista,' elementos: ',entity.totalDatos)
          this.fichasfiltradas.concat(entity.lista);
      },
        error => console.log('no se puede filtrar las fichas por subcategoria')
      )
    }
  }

  getFichasClinicasPorIdCategoria() {
    if (this.idCategoria) {
      this.servicioFichaClinica.getFichasClinicasPorCategoria(this.idCategoria).subscribe(
        entity =>{ console.log('lista por categoria: ',entity.lista,' elementos: ',entity.totalDatos)
          this.fichasfiltradas.concat(entity.lista);
      },
        error => console.log('no se puede filtrar las fichas por subcategoria')
      )
    }
  }
 
  traerCategorias(): void { //función para traer la lista de categorías
    this.servicioCategoria.getCategorias().subscribe(
       entity=>{
         this.categorias=entity.lista
         console.log('categorias',this.categorias)
         
       },
       error=>{
         console.log("Error al traer categorias ",error.error)
       }
   )
 }
    
  traerSubCategorias(): void { //función para traer la lista de categorías
    this.servicioSubcategoria.getSubcategorias().subscribe(
       entity=>{
         this.subcategorias=entity.lista
         console.log('categorias',this.categorias)
         
       },
       error=>{
         console.log("Error al traer subcategorias ",error.error)
       }
   )
 }
    
 traerSubCategoriasFiltradas(): void { //función para traer la lista de categorías
   this.servicioSubcategoria.getSubcategoriasPorIdCategoria(this.idCategoria).subscribe(
      entity=>{
        this.subcategoriasfiltradas=entity.lista
        console.log('categorias',this.categorias)
        
      },
      error=>{
        console.log("Error al traer subcategorias ",error.error)
      }
    )
  }

  getAllFichas(): void{
    console.log('fichas clinicas en all: '+this.fichasclinicas);
    console.log('fichas filtradas en all: '+this.fichasfiltradas);
    this.fichasfiltradas = [...this.fichasclinicas];
  }
  
  resetField(){
    this.fechaHasta=this.fechaDesde=this.fisioterapeutaId=this.pacienteId=this.idCategoria=this.idSubcategoria=null
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
