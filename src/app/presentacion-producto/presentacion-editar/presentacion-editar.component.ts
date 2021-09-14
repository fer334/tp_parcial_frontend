import { Component, OnInit } from '@angular/core';
import { ExistenciaProducto, PresentacionProducto } from 'src/app/model/presentacionProducto';
import { Producto } from 'src/app/model/presentacionProducto';
import { PresentacionProductoService } from 'src/app/service/presentacion-producto.service';
import { ActivatedRoute,Router } from '@angular/router';
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

  constructor(
    private presentacionService: PresentacionProductoService,
    private route :ActivatedRoute,
    private routeNavigate:Router
    ) { }

  ngOnInit(): void {
    const routeParams=this.route.snapshot.paramMap
    let idPresentacionProducto=Number(routeParams.get('id'))
    this.fetchProducts()
    this.fetchPresentacionProducto(idPresentacionProducto)
    this.loaded=true
  }
  
  guardar():void{
    console.log("Estoy Agregandoo....",this.presentacionProducto)
    this.presentacionService.actualizarPresentacionProducto(this.presentacionProducto).subscribe(
      entity=>{
        console.log("Se actualizoo",entity)
        this.mensaje="Se Edito exitosamente"  
        setTimeout(()=>{
          this.routeNavigate.navigate(['/presentacionProducto'])
        },1000)
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

  fetchPresentacionProducto(idPresentacionProducto:number):void{
    this.presentacionService.getPresentacionProducto(idPresentacionProducto).subscribe(
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
