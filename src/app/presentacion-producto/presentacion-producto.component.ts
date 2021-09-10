import { ElementSchemaRegistry } from '@angular/compiler';
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
  presentacionProductos: PresentacionProducto[]= []
  
  newPresentacionProducto: PresentacionProducto= new PresentacionProducto()
  constructor(private servicioPresentacionProducto: PresentacionProductoService,private route : ActivatedRoute) { }

  ngOnInit(): void {
      this.getListPresentacionProducto()
  }
  getListPresentacionProducto():void{
    this.servicioPresentacionProducto.getPresentacionProductos().subscribe(
      entity =>{
        console.log("result",entity.lista)
        return this.presentacionProductos= entity.lista
      },
      error=> console.log("No se pudieron obtener la lista Presentacion Productos")
    );
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
  getByName():void{
      this.servicioPresentacionProducto.getPresentacionProductoPorNombre("Jesus").subscribe(
          entity=>{
            console.log("Lista",entity.lista)
          },
          error=> console.log("Error",error)
      )
  }

    /* Funcion que retorna la lista de productos por tipo de Producto */
    getProductByProductType():void{
      this.servicioPresentacionProducto.getProductosPorIdTipoProducto(53).subscribe(
          entity=>{
            console.log("Lista",entity.lista)
          },
          error=> console.log("Error",error)
      )
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
        this.ngOnInit()
      }, 
      error => console.log("Error",error)
    )
  }
  

}
