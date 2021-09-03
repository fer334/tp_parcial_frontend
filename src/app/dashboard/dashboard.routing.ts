import { Routes } from '@angular/router';
import { CategoriaComponent } from '../categoria/categoria.component';

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
          path: 'categoria',
          component: CategoriaComponent,
        }
    ]
}
];
