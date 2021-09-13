import { Routes } from '@angular/router';
import { CreateHorarioComponent } from '../horario/createhorario.component';
import { HorarioComponent } from '../horario/horario.component';
import { CreateHorarioExComponent } from '../horario_ex/createhorario.component';
import { HorarioExComponent } from '../horario_ex/horario.component';
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
    ],
  },
];
