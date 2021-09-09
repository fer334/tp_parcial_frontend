import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentacionProductoComponent } from './presentacion-producto/presentacion-producto.component';
import { PresentacionAgregarComponent } from './presentacion-producto/presentacion-agregar/presentacion-agregar.component';
const routes: Routes = [
 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
