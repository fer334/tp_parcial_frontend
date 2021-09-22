import { Component, OnInit } from '@angular/core';
import { PresentacionProducto,ExistenciaProducto,Producto } from 'src/app/model/presentacionProducto';
import { PresentacionProductoService } from 'src/app/service/presentacion-producto.service';
import { listadatos } from 'src/app/model/datos';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import swal from 'sweetalert2';

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
    },1)  
  }
  guardar():void{
    console.log("Estoy Agregandoo....",this.presentacionProducto)
    this.presentacionService.createPresentacionProducto(this.presentacionProducto).subscribe(
      entity=>{
        console.log("Se creeo",entity)
        this.mensaje="Se creo exitosamente"
        //this.goBack()
        this.showSwall(true)
      },
      error=> {
        console.log("Hubo un Error",error)
        this.showSwall(false)
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
  showSwall(type:boolean){
    if(type){
        swal.fire({
          title: "Creado",
          text: "Se ha Creado Exitosamente un nuevo Presentacion Producto",
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-success",
          },
          icon: "success"
      }).then((result)=>{
        if(result.isConfirmed) this.goBack()
        else this.goBack()

      });
  }else{
      swal.fire({
        title: "Error!",
        text: "No se pudo crear el nuevo registro",
        buttonsStyling: false,
        customClass:{
          confirmButton: "btn btn-info"
        }
      });
    }
  }
}
