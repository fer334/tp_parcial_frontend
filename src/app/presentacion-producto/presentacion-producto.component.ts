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
        this.presentacionProductosFiltrado= entity.lista
      },
      error=> console.log("No se pudieron obtener la lista Presentacion Productos")
    );
  }

  filtrar():void{
    let result=this.getProductByProductType(this.idTipoProductoFilter)
    if(this.nombreFilter && this.idTipoProductoFilter){
      console.log("here")
      this.presentacionProductosFiltrado=result.filter((item)=>item.nombre==this.nombreFilter)
    }else if(this.nombreFilter){
        this.presentacionProductosFiltrado=this.getByName(this.nombreFilter)
        console.log("here2",this.presentacionProductosFiltrado)
    }else if(this.idTipoProductoFilter) {
      console.log("here 3")
      this.presentacionProductosFiltrado=[...result]
    }
  }
  /* Funcion que retorna la lista de presentacion producto por Id tipo de Producto */
  getByProdutType(): void {
     this.servicioPresentacionProducto.getPrentacionProductoPorIdTipoProducto(2).subscribe(
          entity=>{
              console.log("Lista",entity.lista)
          },
          error=> console.log("Error:",error)
      );
  }

  /* Funcion que retorna la lista de presentacion producto por nombre */
  getByName(nombre:any):PresentacionProducto[]{
      let result=[]
      this.servicioPresentacionProducto.getPresentacionProductoPorNombre(nombre).subscribe(
          entity=>{
            console.log("Lista",entity.lista)
            result=entity.lista
          },
          error=> console.log("Error",error)
      )
      return result
  }

    /* Funcion que retorna la lista de productos por tipo de Producto */
    getProductByProductType(id:any):PresentacionProducto[]{
      let result=[]
      this.servicioPresentacionProducto.getProductosPorIdTipoProducto(id).subscribe(
          entity=>{
            console.log("Lista",entity.lista)
            result= entity.lista
          },
          error=> console.log("Error",error)
      )
      return result
  }
  /* Funcion que retorna la lista de productos por tipo de Producto */
  getPriceByIdPresentacionProducto():void{
    this.servicioPresentacionProducto.getPrecioByPresentacionProducto(6).subscribe(
        entity=>{
          console.log("Lista",entity.lista)
        },
        error=> console.log("Error",error)
    )
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
