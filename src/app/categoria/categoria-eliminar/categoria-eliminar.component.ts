import { Component, OnInit } from '@angular/core';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';

@Component({
  selector: 'app-categoria-eliminar',
  templateUrl: './categoria-eliminar.component.html',
  styleUrls: ['./categoria-eliminar.component.css']
})
export class CategoriaEliminarComponent implements OnInit {
  id: number=0;
  mensaje: string = "";

  constructor(private servicioCategoria: ServicecategoriaService) { }

  ngOnInit(): void {
  }

  borrar(): void{
    this.servicioCategoria.eliminarCategoria(this.id).subscribe(
      () => {
        this.mensaje='Eliminado exitosamente'
      },
      error => console.log("el error es: "+ error)
    );
    console.log(this.id);
  }

}
