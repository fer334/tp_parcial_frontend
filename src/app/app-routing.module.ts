import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAgregarComponent } from './categoria/categoria-agregar/categoria-agregar.component';
import { CategoriaEditarComponent } from './categoria/categoria-editar/categoria-editar.component';
import { CategoriaEliminarComponent } from './categoria/categoria-eliminar/categoria-eliminar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';
import { SubcategoriaAgregarComponent } from './subcategoria/subcategoria-agregar/subcategoria-agregar.component';
import { SubcategoriaEditarComponent } from './subcategoria/subcategoria-editar/subcategoria-editar.component';
import { SubcategoriaEliminarComponent } from './subcategoria/subcategoria-eliminar/subcategoria-eliminar.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FichaClinicaAgregarComponent } from './ficha-clinica/ficha-clinica-agregar/ficha-clinica-agregar.component';
import { CreatePaciente } from './paciente/createpaciente.component';
import { EditPaciente } from './paciente/editpaciente.component';
import { FichaClinicaEditarComponent } from './ficha-clinica/ficha-clinica-editar/ficha-clinica-editar.component';

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
    path: 'borrarcategoria/:id',
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
    path: 'borrarsubcategoria/:id',
    component: SubcategoriaEliminarComponent,
  }, //path para borrar subcategorias
  {
    path: 'editarsubcategoria/:id',
    component: SubcategoriaEditarComponent,
  }, //editar subcategorias 

  //desde acá componentes de ficha clinica
  {
    path: 'nuevaficha_clinica',
    component: FichaClinicaAgregarComponent,
  },
  {
    path: 'ficha_clinica',
    component: FichaClinicaComponent,
  },
  {
    path: 'editarficha_clinica/:id',
    component: FichaClinicaEditarComponent,
  },
  {
    path: 'paciente',
    component: PacienteComponent,
  },
  {
    path: 'paciente/create',
    component: CreatePaciente,
  },
  {
    path: 'paciente/edit/:id',
    component: EditPaciente,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
