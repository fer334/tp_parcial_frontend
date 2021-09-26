import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedpluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { DataTablesModule } from "angular-datatables";

import { AppRoutes } from './app.routing';
import { ServicesubcategoriaService } from './service/servicesubcategoria.service';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';
import { PacienteService } from './service/servicepaciente.service';
import { PacienteComponent } from './paciente/paciente.component';
import { CreatePaciente } from './paciente/createpaciente.component';
import { EditPaciente } from './paciente/editpaciente.component';
import { ServicefichaclinicaService } from './service/servicefichaclinica.service';
import { FichaClinicaAgregarComponent } from './ficha-clinica/ficha-clinica-agregar/ficha-clinica-agregar.component';
import { FichaClinicaEditarComponent } from './ficha-clinica/ficha-clinica-editar/ficha-clinica-editar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAgregarComponent } from './categoria/categoria-agregar/categoria-agregar.component';
import { CategoriaEliminarComponent } from './categoria/categoria-eliminar/categoria-eliminar.component';
import { CategoriaEditarComponent } from './categoria/categoria-editar/categoria-editar.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { SubcategoriaAgregarComponent } from './subcategoria/subcategoria-agregar/subcategoria-agregar.component';
import { SubcategoriaEditarComponent } from './subcategoria/subcategoria-editar/subcategoria-editar.component';
import { SubcategoriaEliminarComponent } from './subcategoria/subcategoria-eliminar/subcategoria-eliminar.component';
import { ServicecategoriaService } from './service/servicecategoria.service';
import { PresentacionProductoComponent } from './presentacion-producto/presentacion-producto.component';
import { PresentacionProductoService } from './service/presentacion-producto.service';
import { PresentacionAgregarComponent } from './presentacion-producto/presentacion-agregar/presentacion-agregar.component';
import { PresentacionEditarComponent } from './presentacion-producto/presentacion-editar/presentacion-editar.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaService } from './service/reserva/reserva.service';
import { ReservaEditarComponent } from './reserva/reserva-editar/reserva-editar.component';
import { ReservaAgregarComponent } from './reserva/reserva-agregar/reserva-agregar.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login/login.service';
import { HorarioComponent } from './horario/horario.component';
import { CreateHorarioComponent } from './horario/createhorario.component';
import { HorarioExComponent } from './horario_ex/horario.component';
import { CreateHorarioExComponent } from './horario_ex/createhorario.component';
import { CreateServicioComponent } from './servicio/createservicio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { MainComponent } from './main/main.component';
import { ServicioService } from './service/servicio.service';
import { DetalleComponent } from './servicio/detalle/detalle.component';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule
  ], //acá se suele crear un declarations con los nuevos componentes, pero eso no funcioná acá. Borrar acá y poner abajo con el resto.
})
export class MaterialModule {}

@NgModule({
    imports:      [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        HttpClientModule,

        MaterialModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedpluginModule,
        DataTablesModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        CategoriaComponent,
        CategoriaAgregarComponent,
        CategoriaEliminarComponent,
        CategoriaEditarComponent,
        SubcategoriaComponent,
        SubcategoriaAgregarComponent,
        SubcategoriaEditarComponent,
        SubcategoriaEliminarComponent,
        FichaClinicaComponent,
        PacienteComponent,
        CreatePaciente,
        EditPaciente,
        FichaClinicaAgregarComponent,
        FichaClinicaEditarComponent,
        //Componentes Presentacion Producto
        PresentacionProductoComponent,
        PresentacionAgregarComponent,
        PresentacionEditarComponent,
        //Componente de Reservas
        ReservaComponent,
        ReservaEditarComponent,
        ReservaAgregarComponent,      
        LoginComponent,
        HorarioComponent,
        CreateHorarioComponent,
        HorarioExComponent,
        CreateHorarioExComponent,
        ServicioComponent,
        CreateServicioComponent,
        MainComponent,
        DetalleComponent
    ],
    providers : [
      MatNativeDateModule,
      ServicecategoriaService,
      ServicesubcategoriaService,
      PacienteService,
      ServicefichaclinicaService,
      PresentacionProductoService,
      ReservaService,
      LoginService,
      ServicioService,
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
