import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategoria-eliminar',
  templateUrl: './subcategoria-eliminar.component.html',
  styleUrls: ['./subcategoria-eliminar.component.css']
})
export class SubcategoriaEliminarComponent implements OnInit {
  subcategoria: Subcategoria = new Subcategoria();
  id: number = 0;
  mensaje: string = "";

  constructor(private servicioSubcategoria: ServicesubcategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.id = +params['id'];
    });
    this.subcategoria.idTipoProducto = this.id;
    //obtiene los datos antiguos de la subcategoria
    this.servicioSubcategoria.getSubcategoriaPorId(this.id).subscribe(
      (subcategoriaOld) => {
        this.subcategoria = subcategoriaOld;
      }
    ); // el + convierte el string id a number
  }

  borrar() {
    const deleteOk = () => {
      Swal.fire({
        title: 'Eliminado!',
        text: 'Sub-Categoría eliminada exitosamente.',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      })
      .then(() => {
        this.router.navigate(['/subcategoria']);
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
      this.servicioSubcategoria.eliminarSubcategoria(this.id).subscribe(
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
