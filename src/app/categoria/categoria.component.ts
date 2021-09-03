import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = []; 
  constructor(private ServicioCategoria: ServicecategoriaService) { }

  ngOnInit(): void {
    this.ServicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista, 
      error => console.log('no se han podido conseguir las categorias')
    );
  }
}
