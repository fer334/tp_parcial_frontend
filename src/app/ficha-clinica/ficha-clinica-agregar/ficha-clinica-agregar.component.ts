import { Component, OnInit } from '@angular/core';
import { FichaClinica, Local } from '../../model/ficha-clinica';
import { Paciente } from '../../model/paciente';
import { Subcategoria } from '../../model/subcategoria';
import { ServicefichaclinicaService } from '../../service/servicefichaclinica.service';
import { PacienteService } from '../../service/servicepaciente.service';
import { ServicesubcategoriaService } from '../../service/servicesubcategoria.service';

@Component({
  selector: 'app-ficha-clinica-agregar',
  templateUrl: './ficha-clinica-agregar.component.html',
  styleUrls: ['./ficha-clinica-agregar.component.css']
})
export class FichaClinicaAgregarComponent implements OnInit {
  fichaclinica: FichaClinica = new FichaClinica();
  mensaje: string = ""
  subcategorias: Subcategoria[] = [];
  clientes: Paciente[] = [];
  empleados: Paciente[] = [];
  locales: Local[] = [];

  constructor(private servicioFichaClinica: ServicefichaclinicaService,
    private servicioSubcategoria: ServicesubcategoriaService,
    private servicioPersona: PacienteService) { }

  ngOnInit(): void {
    this.traerSubCategorias();
    this.traerPersonas();
    this.traerLocales();
  }

  guardar(): void{
    this.servicioFichaClinica.agregarFichaClinica(this.fichaclinica).subscribe(
      () => {
        this.mensaje = "Agregado exitosamente"
      },
      error => this.mensaje = "Error al agregar ficha: "+ error.error
    );
  }
 
  traerSubCategorias(): void { //función para traer la lista de subcategorías a la hora de crear una ficha clinica
    this.servicioSubcategoria.getSubcategorias().subscribe(
       entity=>{
         this.subcategorias=entity.lista
        console.log('categorias',this.subcategorias) 
      },
     error=>{
       console.log("Error al traer subcategorias para la ficha clinica ",error.error)
     }
    );
  }

  traerPersonas(): void { //función para traer la lista de clientes y doctores a la hora de crear una ficha clinica
    this.servicioPersona.getPacientes().subscribe(
       entity=>{
         this.clientes=entity.lista
         this.empleados = entity.lista
        console.log('personas',this.clientes) 
      },
     error=>{
       console.log("Error al traer personas para la ficha clinica ",error.error)
     }
    );
  }

  traerLocales(): void{
    this.servicioFichaClinica.getLocales().subscribe(
      entity => {
        this.locales = entity.lista
        console.log('locales',this.locales)
      },
      error=>{
        console.log("error al traer los locales para la ficha ",error.error)
      }
    );
  }

}
