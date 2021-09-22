import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categoria-agregar',
  templateUrl: './categoria-agregar.component.html',
  styleUrls: ['./categoria-agregar.component.css']
})
export class CategoriaAgregarComponent implements OnInit {
  
  categoria: Categoria = new Categoria();
  mensaje: string = "";
  
  constructor(private servicioCategoria: ServicecategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  guardar(): void{
    this.servicioCategoria.agregarCategorias(this.categoria).subscribe(
      () => {
        this.mensaje='Agregado exitosamente'
        Swal.fire({
          title: 'Creada!',
          text: 'La nueva categoría fue creada exitosamente.',
          icon: 'success',
          customClass: {
          confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        }).then(() => {
            this.router.navigate(['/categoria'])
        });
      },
      error =>{ console.log("error: "+ error)
      let message = 'La categoría no pudo ser editada. \n'
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
