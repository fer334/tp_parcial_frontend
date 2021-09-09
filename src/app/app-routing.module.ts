import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAgregarComponent } from './categoria/categoria-agregar/categoria-agregar.component';
import { CategoriaEditarComponent } from './categoria/categoria-editar/categoria-editar.component';
import { CategoriaEliminarComponent } from './categoria/categoria-eliminar/categoria-eliminar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaAgregarComponent } from './subcategoria/subcategoria-agregar/subcategoria-agregar.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';

const routes: Routes = [
  {
    path:'categoria',
    component:CategoriaComponent 
  }, //path para leer categorias
  {
    path:'nuevacategoria',
    component:CategoriaAgregarComponent
  }, //path para agregar categorias
  {
    path: 'borrarcategoria',
    component: CategoriaEliminarComponent,
  }, //path para borrar categorias
  {
    path: 'editarcategoria/:id',
    component: CategoriaEditarComponent,
  }, //editar categorias
  {
    path: 'subcategoria',
    component: SubcategoriaComponent,
  }, //path para listar subcategorias
  {
    path:'nuevasubcategoria',
    component: SubcategoriaAgregarComponent,
  }, //path para agregar subcategorias
  {
    path: 'borrarsubcategoria',
    component: CategoriaEliminarComponent,
  }, //path para borrar categorias XXXX
  {
    path: 'editarsubcategoria/:id',
    component: CategoriaEditarComponent,
  } //editar categorias XXXX
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
