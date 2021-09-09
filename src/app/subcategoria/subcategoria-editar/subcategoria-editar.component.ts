import { Component, OnInit } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-subcategoria-editar',
  templateUrl: './subcategoria-editar.component.html',
  styleUrls: ['./subcategoria-editar.component.css']
})
export class SubcategoriaEditarComponent implements OnInit {
  subcategoria: Subcategoria = new Subcategoria(); //valor actual
  subcategoriaedit: Subcategoria = new Subcategoria(); //valor editado
  categorias: Categoria[] = [];
  mensaje: string = "";

  constructor(private servicioSubcategoria:ServicesubcategoriaService,
    private servicioCategoria:ServicecategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const id = +params['id']; // el + convierte el string id a number
      this.subcategoriaedit.idTipoProducto = id;
      this.traerCategorias();
    });
    //this.cargarSubcategoria();
  }

  editar(): void{
    this.servicioSubcategoria.editarSubcategoria(this.subcategoriaedit).subscribe(
      ()=> {
        this.mensaje='subcategoria editada exitosamente'
      },
      error =>{ console.log("el error al editar es: "+error);
        console.log("llega el valor? "+this.subcategoriaedit.descripcion);
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
  
  //sfunction cargarSubcategoria(): void{

  //}
}

