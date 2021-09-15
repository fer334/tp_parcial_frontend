import { Component, OnInit } from '@angular/core';
import { PresentacionProducto,ExistenciaProducto,Producto } from 'src/app/model/presentacionProducto';
import { PresentacionProductoService } from 'src/app/service/presentacion-producto.service';
import { listadatos } from 'src/app/model/datos';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
@Component({
  selector: 'app-presentacion-agregar',
  templateUrl: './presentacion-agregar.component.html',
  styleUrls: ['./presentacion-agregar.component.css']
})
export class PresentacionAgregarComponent implements OnInit {

  presentacionProducto: PresentacionProducto = new PresentacionProducto()
  products: Producto[]=[]

  mensaje: String=""

  constructor( 
    private presentacionService: PresentacionProductoService,
    private route:Router,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.isLogged()
    this.fetchProducts()
  }
  goBack(): void{
    setTimeout(()=>{
      this.route.navigate(['/presentacionProducto'])
    },1000)
  }
  guardar():void{
    console.log("Estoy Agregandoo....",this.presentacionProducto)
    this.presentacionService.createPresentacionProducto(this.presentacionProducto).subscribe(
      entity=>{
        console.log("Se creeo",entity)
        this.mensaje="Se creo exitosamente"
        this.goBack()
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
    
  }

}
