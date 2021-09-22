import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  categoriaEdit: Categoria = new Categoria();
  // categoriaOld: Categoria = new Categoria();
  mensaje: string = "";
  
  constructor(private servicioCategoria: ServicecategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const id = +params['id']; // el + convierte el string id a number
      this.categoriaEdit.idCategoria = id;
      //obtiene los datos antiguos de la categoria
      this.servicioCategoria.getCategoriaPorId(id).subscribe(
        (categoriaOld) => {
          this.categoriaEdit = categoriaOld;
        }
      );
    });
  }

  editar(): void{
    this.servicioCategoria.editarCategoria(this.categoriaEdit).subscribe(
      ()=> {
        this.mensaje='categoria editada exitosamente';
        Swal.fire({
          title: 'Editado!',
          text: 'La categoria fue editada exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })
        .then(() => {
          this.router.navigate(['/categoria']);
        });
      },
      (error) =>{ 
        console.log("el error al editar es: "+error);
        let message = 'la categoria no pudo ser creada. \n';
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
    });
  }
}
