import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subcategoria } from '../model/subcategoria';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  subcategorias: Subcategoria[] = []; 
  
  constructor( private servicioSubcategoria: ServicesubcategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //cargar lista de subcategorias
    this.servicioSubcategoria.getSubcategorias().subscribe(
      entity => this.subcategorias = entity.lista,
      error => console.log('no se pudieron conseguir las subcategorias')
    );

    //imprimimos las funciones extra en consola
    this.getSubcategoriaPorId();
    this.getSubcategoriaPorDescripcion();
    this.getSubcategoriaPorIdCategoria();
  }
  
  edit(sc: Subcategoria){
    this.router.navigate(['editarsubcategoria/',sc.idTipoProducto]);
  }

  getSubcategoriaPorId(): void { //para el ejemplo se consulta por la subcategoria con id 46
    this.servicioSubcategoria.getSubcategoriaPorId(46).subscribe(
      entity => console.log("subcategoria con id 46 ("+entity.idTipoProducto+") "+entity.descripcion),
      error => console.log("error al traer subcategoria con id 46")
    );
  }

  getSubcategoriaPorDescripcion(): void { //traer lista de subcategorias que tengan esta descripcion
    this.servicioSubcategoria.getSubcategoriasPorDescripcion("subcategoria2").subscribe(
      entity => console.log("lista de subcategorias con descripcion subcategoria2 "+entity.lista+ " ["+ entity.totalDatos +"] elementos"),
      error => console.log('no se pudieron conseguir las subcategorias')
    );
  }

  getSubcategoriaPorIdCategoria(): void { //traer lista de subcategorias que tengan este idcategoria
    this.servicioSubcategoria.getSubcategoriasPorIdCategoria(3).subscribe(
      entity => console.log("lista de subcategorias con categoria de id 3: "+entity.lista+ " ["+ entity.totalDatos +"] elementos"),
      error => console.log('no se pudieron conseguir las subcategorias')
    );
  }
}
