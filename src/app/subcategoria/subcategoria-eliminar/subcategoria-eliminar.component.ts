import { Component, OnInit } from '@angular/core';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-subcategoria-eliminar',
  templateUrl: './subcategoria-eliminar.component.html',
  styleUrls: ['./subcategoria-eliminar.component.css']
})
export class SubcategoriaEliminarComponent implements OnInit {
  id: number = 0;
  mensaje: string = "";

  constructor(private servicioSubcategoria: ServicesubcategoriaService) { }

  ngOnInit(): void {
  }

  borrar(): void{
    this.servicioSubcategoria.eliminarSubcategoria(this.id).subscribe(
      () => {
        this.mensaje='Subcategoria Eliminada exitosamente'
      },
      error =>{ console.log("el error al eliminar la sc es: "+ error);
        this.mensaje= error.error;
      }
    );
    console.log(this.id);
  }
}
