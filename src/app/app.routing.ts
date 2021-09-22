import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { PresentacionProductoComponent } from './presentacion-producto/presentacion-producto.component';
import { PresentacionAgregarComponent } from './presentacion-producto/presentacion-agregar/presentacion-agregar.component';
import { PresentacionEditarComponent } from './presentacion-producto/presentacion-editar/presentacion-editar.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaEditarComponent } from './reserva/reserva-editar/reserva-editar.component';
import { ReservaAgregarComponent } from './reserva/reserva-agregar/reserva-agregar.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }, {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
    }, {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    }, {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    }, {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
    }, {
        path: 'charts',
        loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    }, {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    }, {
        path: '',
        loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
    }, {
        path: '',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
    },
    {
        path:'presentacionProducto',
        component:PresentacionProductoComponent,
    },
    {
        path:'agregarpresentacionProducto',
        component:PresentacionAgregarComponent
    },
    {
        path:'editarpresentacionProducto/:id',
        component:PresentacionEditarComponent
    },
    {
        path:'reserva',
        component:ReservaComponent
    },
    {
        path:'editarReserva/:id',
        component:ReservaEditarComponent
    },
    {
        path:'agregarReserva',
        component:ReservaAgregarComponent
    },
    ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }]
    }


];
