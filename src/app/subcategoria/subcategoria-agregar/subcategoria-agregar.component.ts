import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-subcategoria-agregar',
  templateUrl: './subcategoria-agregar.component.html',
  styleUrls: ['./subcategoria-agregar.component.css']
})
export class SubcategoriaAgregarComponent implements OnInit {
  subcategoria: Subcategoria = new Subcategoria();
  categorias: Categoria[]= [];
  mensaje: string = "";

  constructor( private servicioSubcategoria: ServicesubcategoriaService, private servicioCategoria: ServicecategoriaService) { }

  ngOnInit(): void {
    this.traerCategorias();
  }
  
  guardar(): void{
    this.servicioSubcategoria.agregarSubcategorias(this.subcategoria).subscribe(
      () => {
        this.mensaje='Subcategoria Agregada correctamente'
      },
      error =>{ console.log("error add sc: "+error);
        this.mensaje=error.error;
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
