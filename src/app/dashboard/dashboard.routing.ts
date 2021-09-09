import { Routes } from '@angular/router';
import { HorarioComponent } from '../horario/horario.component';
import { CreatePaciente } from '../paciente/createpaciente.component';
import { EditPaciente } from '../paciente/editpaciente.component';
import { PacienteComponent } from '../paciente/paciente.component';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
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
        path: 'horarios',
        component: HorarioComponent,
      }
    ],
  },
];
