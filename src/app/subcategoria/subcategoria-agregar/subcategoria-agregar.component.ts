import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategoria-agregar',
  templateUrl: './subcategoria-agregar.component.html',
  styleUrls: ['./subcategoria-agregar.component.css']
})
export class SubcategoriaAgregarComponent implements OnInit {
  subcategoria: Subcategoria = new Subcategoria();
  categorias: Categoria[]= [];
  mensaje: string = "";

  constructor( private servicioSubcategoria: ServicesubcategoriaService,
     private servicioCategoria: ServicecategoriaService,
     private router: Router) { }

  ngOnInit(): void {
    this.traerCategorias();
  }
  
  guardar(): void{
    this.servicioSubcategoria.agregarSubcategorias(this.subcategoria).subscribe(
      () => {
        this.mensaje='Subcategoria Agregada correctamente';
        Swal.fire({
          title: 'Creada!',
          text: 'La nueva sub-categoría fue creada exitosamente.',
          icon: 'success',
          customClass: {
          confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        }).then(() => {
            this.router.navigate(['/subcategoria'])
        });
      },
      error =>{ console.log("error add sc: "+error);
        let message = 'La sub-categoría no pudo ser agregada. \n'
        message += error.error ? error.error : error.message;
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            customClass: {
            confirmButton: 'btn btn-danger',
            },
            buttonsStyling: false,
        });
      }
    );
  }

  traerCategorias(): void { //función para traer la lista de categorías a la hora de crear una subcategoria
    this.servicioCategoria.getCategorias().subscribe(
       entity=>{
         this.categorias=entity.lista
         console.log('categorias',this.categorias)
         
       },
       error=>{
         console.log("Error al traer categorias para la subcategoria ",error.error)
       }
   )
 }
}
