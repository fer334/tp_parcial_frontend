import { ElementSchemaRegistry, ThrowStmt } from '@angular/compiler';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { PresentacionProducto } from '../model/presentacionProducto';
import { PresentacionProductoService } from '../service/presentacion-producto.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import swal from 'sweetalert2';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];

}

declare const $: any;

@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.css']
})
export class PresentacionProductoComponent implements OnInit,AfterViewInit {
  
  constructor(
    private servicioPresentacionProducto: PresentacionProductoService,
    private route : ActivatedRoute,
    private loginService:LoginService
    ) { }
  //states
  mensaje: String=""
  presentacionProductos: PresentacionProducto[]= []
  presentacionProductosFiltrado: PresentacionProducto[]= []
  newPresentacionProducto: PresentacionProducto= new PresentacionProducto()
  idTipoProductoFilter:String=""
  nombreFilter:String=""
  public dataTable: DataTable;

  ngOnInit(): void {
      this.loginService.isLogged()
      this.getListPresentacionProducto()
      this.dataTable = {
        headerRow: [ 'Id', 'Codigo', 'Nombre', 'IdProducto', 'IdTipoProducto', 'PrecioVenta','FlagServicio','Accion' ],
        footerRow:[ 'Id', 'Codigo', 'Nombre', 'IdProducto', 'IdTipoProducto', 'PrecioVenta','FlagServicio','Accion' ]
      }
  }
  ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }
    });
    const table = $('#datatables').DataTable();
    console.log('Tablee',table);
    
    $('.card .material-datatables label').addClass('form-group');
  }
  getListPresentacionProducto():void{
    this.servicioPresentacionProducto.getPresentacionProductos().subscribe(
      entity =>{
        console.log("result",entity.lista)
        this.presentacionProductos=this.presentacionProductosFiltrado= entity.lista
      },
      error=> console.log("No se pudieron obtener la lista Presentacion Productos")
    );
  }
  getAll(){
    this.getListPresentacionProducto()
  }
  resetFields(){
    this.idTipoProductoFilter=this.nombreFilter=""
  }
  filtrar():void{
    console.log(this.nombreFilter,this.idTipoProductoFilter)
    if (!this.nombreFilter && !this.idTipoProductoFilter) {
      this.presentacionProductosFiltrado=this.presentacionProductos
      console.log("here2");
      
    }
    else{
      console.log("Here");
      this.getByProdutType(this.idTipoProductoFilter)
      .then((data)=> data)
      .then((result)=>{
        if(this.nombreFilter && this.idTipoProductoFilter){
          this.presentacionProductosFiltrado=result.filter((item)=>item.nombre.toLocaleLowerCase().includes(this.nombreFilter.toLocaleLowerCase()))
        }else if(this.nombreFilter){
            this.getByName(this.nombreFilter).
            then((data)=>this.presentacionProductosFiltrado=data)
            .catch((error)=>console.log(error))
        }else if(this.idTipoProductoFilter) {
          this.presentacionProductosFiltrado=[...result]
        }
      })
      .catch((error)=>{
        console.log(error)
        this.presentacionProductosFiltrado=[]
      })
    }
  }
  /* Funcion que retorna la lista de presentacion producto por Id tipo de Producto */
  getByProdutType(id:any): Promise<PresentacionProducto[]> {
     return new Promise((resolve,reject)=>{
            this.servicioPresentacionProducto.getPrentacionProductoPorIdTipoProducto(id).subscribe(
              entity=>{
                  console.log("Lista",entity.lista)
                  resolve(entity.lista)
              },
              error=> {console.log("Error:",error);reject("error")}
          );
     })
  }

  /* Funcion que retorna la lista de presentacion producto por nombre */
   async getByName  (nombre:any):Promise<PresentacionProducto[]>{
      let result=[]
      return new Promise((resolve,reject)=>{
        this.servicioPresentacionProducto.getPresentacionProductoPorNombre(nombre).subscribe(
          entity=>{
            console.log("Lista",entity.lista)
            resolve(entity.lista)
          },
          error=> {console.log("Error",error);reject("Error")}
      )
      })
      
  }

    /* Funcion que retorna la lista de productos por tipo de Producto */
    async getProductByProductType(id:any):Promise<PresentacionProducto[]>{
      return new Promise((resolve,reject)=>{
        this.servicioPresentacionProducto.getProductosPorIdTipoProducto(id).subscribe(
          entity=>{
            console.log("Lista",entity.lista)
            resolve(entity.lista)
          },
          error=> {console.log("Error",error); reject(error)}
        )
      }) 
  }
  /* Funcion que retorna la lista de productos por tipo de Producto */
  getPriceByIdPresentacionProducto(id:any):Promise<PresentacionProducto[]>{
    return new Promise((resolve,reject)=>{
      this.servicioPresentacionProducto.getPrecioByPresentacionProducto(id).subscribe(
        entity=>{
          console.log("Lista",entity.lista)
          resolve(entity.lista)
        },
        error=> {console.log("Error",error);reject("error")}
    )
    })
  }

  /* Eliminar una Presentacion Producto */
  deletePresentacionProducto(idPresentacionProducto:number):void {
    this.servicioPresentacionProducto.deletePresentacionProducto(idPresentacionProducto).subscribe(
      entity=>{
        console.log("Se elimino",entity)

        this.mensaje="Se elimino Exitosamente el registro"
        this.showSwallMessage(true)
      }, 
      error => {
        console.log("Error",error)
        this.showSwallMessage(false)
      }
    )
  }
  
  showSwall(idPresentacionProducto:number){
    swal.fire({
      title: 'Estas Seguro',
      text: "Una vez eliminado, ya no podras revertirlo",
      icon: 'warning',
      showCancelButton: true,
      customClass:{
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText:"Cancelar",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.deletePresentacionProducto(idPresentacionProducto)
      }
    })    
  }
  showSwallMessage(type:boolean){
    if(type){
      swal.fire(
        {
          title: 'Eliminado',
          text: 'El registro ha sido Eliminado',
          icon: 'success',
          customClass:{
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false
        }
      ).then(()=>this.ngOnInit())
    } else{
    swal.fire({
      title: "Error!",
      text: "No se pudo Eliminar el  registro",
      buttonsStyling: false,
      customClass:{
        confirmButton: "btn btn-info"
      }
    });
  }
  }

}
