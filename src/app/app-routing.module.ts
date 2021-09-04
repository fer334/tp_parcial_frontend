import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAgregarComponent } from './categoria/categoria-agregar/categoria-agregar.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  {
    path:'categoria',
    component:CategoriaComponent 
  }, //path para leer categorias
  {
    path:'nuevacategoria',
    component:CategoriaAgregarComponent
  } //path para agregar categorias
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
