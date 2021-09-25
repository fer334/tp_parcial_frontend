import { Routes } from '@angular/router';
import { CategoriaAgregarComponent } from '../categoria/categoria-agregar/categoria-agregar.component';
import { CategoriaEditarComponent } from '../categoria/categoria-editar/categoria-editar.component';
import { CategoriaEliminarComponent } from '../categoria/categoria-eliminar/categoria-eliminar.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { FichaClinicaComponent } from '../ficha-clinica/ficha-clinica.component';
import { SubcategoriaAgregarComponent } from '../subcategoria/subcategoria-agregar/subcategoria-agregar.component';
import { SubcategoriaEditarComponent } from '../subcategoria/subcategoria-editar/subcategoria-editar.component';
import { SubcategoriaEliminarComponent } from '../subcategoria/subcategoria-eliminar/subcategoria-eliminar.component';
import { SubcategoriaComponent } from '../subcategoria/subcategoria.component';
import { CreateHorarioComponent } from '../horario/createhorario.component';
import { HorarioComponent } from '../horario/horario.component';
import { CreateHorarioExComponent } from '../horario_ex/createhorario.component';
import { HorarioExComponent } from '../horario_ex/horario.component';
import { CreatePaciente } from '../paciente/createpaciente.component';
import { EditPaciente } from '../paciente/editpaciente.component';
import { PacienteComponent } from '../paciente/paciente.component';
import { CreateServicioComponent } from '../servicio/createservicio.component';
import { ServicioComponent } from '../servicio/servicio.component';

import { DashboardComponent } from './dashboard.component';
import { FichaClinica } from '../model/ficha-clinica';
import { FichaClinicaAgregarComponent } from '../ficha-clinica/ficha-clinica-agregar/ficha-clinica-agregar.component';
import { FichaClinicaEditarComponent } from '../ficha-clinica/ficha-clinica-editar/ficha-clinica-editar.component';

export const DashboardRoutes: Routes = [
    {
      path: '',
      children: [ 
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'categoria',
          component: CategoriaComponent,
        },
        {
          path: 'nuevacategoria',
          component: CategoriaAgregarComponent,
        },
        {
          path: 'borrarcategoria/:id',
          component: CategoriaEliminarComponent,
        },
        {
          path: 'editarcategoria/:id',
          component: CategoriaEditarComponent,
        },
        {
          path: 'subcategoria',
          component: SubcategoriaComponent,
        },
        {
          path: 'nuevasubcategoria',
          component: SubcategoriaAgregarComponent,
        },
        {
          path: 'editarsubcategoria/:id',
          component: SubcategoriaEditarComponent,
        },
        {
          path: 'borrarsubcategoria/:id',
          component: SubcategoriaEliminarComponent,
        },
        {
          path: 'ficha_clinica',
          component: FichaClinicaComponent,
        },
        {
          path: 'nuevaficha_clinica',
          component: FichaClinicaAgregarComponent,
        },
        {
          path: 'editarficha_clinica/:id',
          component: FichaClinicaEditarComponent,
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
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
      {
        path: 'dashboard',
        component: DashboardComponent,
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
        component: EditPaciente
      },
      {
        path: 'horario',
        component: HorarioComponent,
      },
      {
        path: 'horario/create',
        component: CreateHorarioComponent,
      },
      {
        path: 'horarioex',
        component: HorarioExComponent,
      },
      {
        path: 'horarioex/create',
        component: CreateHorarioExComponent,
      }
        {
          path: 'servicio/create',
          component: CreateServicioComponent,
        },
        {
          path: 'servicio',
          component: ServicioComponent,
        }
      ],
  },
];
