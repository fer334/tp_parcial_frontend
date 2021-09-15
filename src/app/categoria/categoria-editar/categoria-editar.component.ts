import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { ServicecategoriaService } from 'src/app/service/servicecategoria.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  categoriaEdit: Categoria = new Categoria();
  mensaje: string = "";
  
  constructor(private servicioCategoria: ServicecategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const id = +params['id']; // el + convierte el string id a number
      this.categoriaEdit.idCategoria = id;
    });
  }

  editar(): void{
    this.servicioCategoria.editarCategoria(this.categoriaEdit).subscribe(
      ()=> {
        this.mensaje='categoria editada exitosamente'
      },
      error => console.log("el error al editar es: "+error)
    );
  }
}
