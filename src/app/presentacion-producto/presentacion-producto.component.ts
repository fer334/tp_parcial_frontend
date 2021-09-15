import { ElementSchemaRegistry, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PresentacionProducto } from '../model/presentacionProducto';
import { PresentacionProductoService } from '../service/presentacion-producto.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.css']
})
export class PresentacionProductoComponent implements OnInit {
  
  constructor(private servicioPresentacionProducto: PresentacionProductoService,private route : ActivatedRoute) { }
  //states
  mensaje: String=""
  presentacionProductos: PresentacionProducto[]= []
    presentacionProductosFiltrado: PresentacionProducto[]= []
  newPresentacionProducto: PresentacionProducto= new PresentacionProducto()
  idTipoProductoFilter:String=""
  nombreFilter:String=""

  ngOnInit(): void {
      this.getListPresentacionProducto()
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

  filtrar():void{
    
    if (!this.nombreFilter && !this.idTipoProductoFilter) this.presentacionProductosFiltrado=this.presentacionProductos
    this.getByProdutType(this.idTipoProductoFilter)
    .then((data)=> data)
    .then((result)=>{
      if(this.nombreFilter && this.idTipoProductoFilter){
        this.presentacionProductosFiltrado=result.filter((item)=>item.nombre.toLocaleLowerCase()==this.nombreFilter.toLocaleLowerCase())
      }else if(this.nombreFilter){
          this.getByName(this.nombreFilter).
          then((data)=>this.presentacionProductosFiltrado=data)
          .catch((error)=>console.log(error))
      }else if(this.idTipoProductoFilter) {
        this.presentacionProductosFiltrado=[...result]
      }
    })
    .catch((error)=>console.log(error))
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
        setTimeout(()=>{
          this.ngOnInit()
          this.mensaje=""
        },1000)
      }, 
      error => console.log("Error",error)
    )
  }
  

}
