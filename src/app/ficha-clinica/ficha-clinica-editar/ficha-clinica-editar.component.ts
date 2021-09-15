import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaClinica, Local } from 'src/app/model/ficha-clinica';
import { Paciente } from 'src/app/model/paciente';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicefichaclinicaService } from 'src/app/service/servicefichaclinica.service';
import { PacienteService } from 'src/app/service/servicepaciente.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-ficha-clinica-editar',
  templateUrl: './ficha-clinica-editar.component.html',
  styleUrls: ['./ficha-clinica-editar.component.css']
})
export class FichaClinicaEditarComponent implements OnInit {
  fichaclinica: FichaClinica = new FichaClinica();
  fichaclinicaedit: FichaClinica = new FichaClinica();
  mensaje: string = "";
  subcategorias: Subcategoria[] = [];
  clientes: Paciente[] = [];
  empleados: Paciente[] = [];
  locales: Local[] = [];

  constructor(private servicioFichaClinica: ServicefichaclinicaService,
    private servicioSubcategoria: ServicesubcategoriaService,
    private servicioPersona: PacienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const id = +params['id']; // el + convierte el string id a number
      this.fichaclinicaedit.idFichaClinica = id;
    });
    this.traerSubCategorias();
    this.traerPersonas();
    this.traerLocales();
  }

  editar(): void{
    this.servicioFichaClinica.editarFichaClinica(this.fichaclinicaedit).subscribe(
      ()=> {
        console.log(this.fichaclinicaedit);
        this.mensaje='ficha clinica editada exitosamente';
      },
      error =>{ console.log("el error al editar es: "+error); 
        console.log("llega el valor? "+this.fichaclinicaedit.motivoConsulta);
        this.mensaje=error.error;
      }
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
