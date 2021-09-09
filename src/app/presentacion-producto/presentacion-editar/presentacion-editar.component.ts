import { Component, OnInit } from '@angular/core';
import { ExistenciaProducto, PresentacionProducto } from 'src/app/model/presentacionProducto';
import { Producto } from 'src/app/model/presentacionProducto';
import { PresentacionProductoService } from 'src/app/service/presentacion-producto.service';

@Component({
  selector: 'app-presentacion-editar',
  templateUrl: './presentacion-editar.component.html',
  styleUrls: ['./presentacion-editar.component.css']
})
export class PresentacionEditarComponent implements OnInit {
  presentacionProducto: PresentacionProducto = new PresentacionProducto()
  products: Producto[] = []
  mensaje : String = ""
  loaded : Boolean = false

  constructor(private presentacionService: PresentacionProductoService) { }

  ngOnInit(): void {
    this.fetchProducts()
    this.fetchPresentacionProducto()
    this.loaded=true
  }
  guardar():void{
    console.log("Estoy Agregandoo....",this.presentacionProducto)
    this.presentacionService.actualizarPresentacionProducto(this.presentacionProducto).subscribe(
      entity=>{
        console.log("Se actualizoo",entity)
        this.mensaje="Se creo exitosamente"
      },
      error=> {
        console.log("Hubo un Error",error)
        this.mensaje="Registro en Uso, Intente igresando otro Codigo"
      }
    )
  }

  fetchProducts(): void {
     this.presentacionService.getProductos().subscribe(
        entity=>{
          this.products=entity.lista
          console.log('productos',this.products)
          
        },
        error=>{
          console.log("Error",error)
        }
    )
  }

  fetchPresentacionProducto():void{
    this.presentacionService.getPresentacionProducto(180).subscribe(
      entity=>{
        this.presentacionProducto=entity
        if (!this.presentacionProducto.existenciaProducto) this.presentacionProducto.existenciaProducto= new ExistenciaProducto()
        console.log("PresentacionProducto",this.presentacionProducto)
      },
      error=>{
        console.log("Error",error)
      }
    )
  }

}
