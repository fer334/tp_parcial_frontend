import { Routes } from '@angular/router';
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
    ],
  },
];
