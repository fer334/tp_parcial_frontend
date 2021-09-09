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
    this.servicioSubcategoria.getSubcategorias().subscribe(
      entity => this.subcategorias = entity.lista,
      error => console.log('no se pudieron conseguir las subcategorias')
    );
  }
  
  edit(sc: Subcategoria){
    this.router.navigate(['editarsubcategoria/',sc.idTipoProducto]);
  }
}
