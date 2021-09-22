import { Component, OnInit } from '@angular/core';
import { ExistenciaProducto, PresentacionProducto } from 'src/app/model/presentacionProducto';
import { Producto } from 'src/app/model/presentacionProducto';
import { PresentacionProductoService } from 'src/app/service/presentacion-producto.service';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import swal from 'sweetalert2';

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
    private routeNavigate:Router,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.isLogged()
    const routeParams=this.route.snapshot.paramMap
    let idPresentacionProducto=Number(routeParams.get('id'))
    this.fetchProducts()
    this.fetchPresentacionProducto(idPresentacionProducto)
    this.loaded=true
  }
  goBack(){
    setTimeout(()=>{
      this.routeNavigate.navigate(['/presentacionProducto'])
    },1)
  }
  guardar():void{
    console.log("Estoy Agregandoo....",this.presentacionProducto)
    this.presentacionService.actualizarPresentacionProducto(this.presentacionProducto).subscribe(
      entity=>{
        console.log("Se actualizoo",entity)
        this.showSwall(true)

      },
      error=> {
        console.log("Hubo un Error",error)
        this.showSwall(false)
        this.ngOnInit()
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
  showSwall(type:boolean){
    if(type){
        swal.fire({
          title: "Actualizado",
          text: "Se ha Actualizado correctamente el registro",
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
        text: "No se pudo Actualizar el  registro",
        buttonsStyling: false,
        customClass:{
          confirmButton: "btn btn-info"
        }
      });
    }
  }

}
