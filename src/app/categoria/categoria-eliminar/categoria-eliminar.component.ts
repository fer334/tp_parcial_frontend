import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-eliminar',
  templateUrl: './categoria-eliminar.component.html',
  styleUrls: ['./categoria-eliminar.component.css']
})
export class CategoriaEliminarComponent implements OnInit {
  categoria: Categoria = new Categoria();
  id: number=0;
  mensaje: string = "";

  constructor(private servicioCategoria: ServicecategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.id = +params['id'];
    });
    this.categoria.idCategoria = this.id;
    //obtiene los datos antiguos de la categoria
    this.servicioCategoria.getCategoriaPorId(this.id).subscribe(
      (categoriaOld) => {
        this.categoria = categoriaOld;
      }
    ); // el + convierte el string id a number
  }

  borrar() {
    const deleteOk = () => {
      Swal.fire({
        title: 'Eliminado!',
        text: 'Categoría eliminada exitosamente.',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      })
      .then(() => {
        this.router.navigate(['/categoria']);
      });
    };
    
    const deleteError = (error) => {
      //first letter in uppercase
      const errorMessage =
        error.error.charAt(0).toUpperCase() + error.error.slice(1) + '.';
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      });
    };

    const tryDelete = () => {
      this.servicioCategoria.eliminarCategoria(this.id).subscribe(
        (entity) => {
          deleteOk();
          this.mensaje='Eliminado exitosamente'
        },
        error =>{ 
          console.log("el error es: "+ error);
          this.mensaje= error.error;
          deleteError(error);
        }
      );
    };

    Swal
      .fire({
        title: 'Estás seguro?',
        text: "No podrás revertir este cambio!",
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'SI, adelante!',
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          tryDelete();
        }
      });
  }

}
