import { Component, OnInit } from '@angular/core';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-subcategoria-agregar',
  templateUrl: './subcategoria-agregar.component.html',
  styleUrls: ['./subcategoria-agregar.component.css']
})
export class SubcategoriaAgregarComponent implements OnInit {
  subcategoria: Subcategoria = new Subcategoria();
  mensaje: string = "";

  constructor( private servicioSubcategoria: ServicesubcategoriaService) { }

  ngOnInit(): void {
  }
  
  guardar(): void{
    this.servicioSubcategoria.agregarSubcategorias(this.subcategoria).subscribe(
      () => {
        this.mensaje='Subcategoria Agregada correctamente'
      },
      error => console.log("error add sc: "+error)
    );
  }
}
