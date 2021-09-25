import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaClinica, Local } from 'src/app/model/ficha-clinica';
import { Paciente } from 'src/app/model/paciente';
import { Servicio } from 'src/app/model/servicio';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ServicefichaclinicaService } from 'src/app/service/servicefichaclinica.service';
import { PacienteService } from 'src/app/service/servicepaciente.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';
import { ServicioService } from 'src/app/service/servicio.service';
import Swal from 'sweetalert2';

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
  servicios: Servicio[] = [];

  constructor(private servicioFichaClinica: ServicefichaclinicaService,
    private servicioSubcategoria: ServicesubcategoriaService,
    private servicioPersona: PacienteService,
    private servicioServicio: ServicioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const id = +params['id']; // el + convierte el string id a number
      this.fichaclinicaedit.idFichaClinica = id;
      this.servicioFichaClinica.getFichaClinicaPorId(id).subscribe(
        (fichaClinicaOld) => {
          this.fichaclinicaedit = fichaClinicaOld;
        }
      );
    });
    this.traerSubCategorias();
    this.traerPersonas();
    this.traerLocales();
    this.traerServicios();
  }

  editar(): void{
    this.servicioFichaClinica.editarFichaClinica(this.fichaclinicaedit).subscribe(
      ()=> {
        console.log(this.fichaclinicaedit);
        this.mensaje='ficha clinica editada exitosamente';
        Swal.fire({
          title: 'Editado!',
          text: 'La ficha clinica fue editada exitosamente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })
        .then(() => {
          this.router.navigate(['/ficha_clinica']);
        });
      },
      error =>{ console.log("el error al editar es: "+error); 
        console.log("llega el valor? "+this.fichaclinicaedit.motivoConsulta);
        let message = 'la ficha clinica no pudo ser editada. \n';
        message += error.error ? error.error : error.message;
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
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
  
  traerServicios(): void { //función para traer la lista de clientes y doctores a la hora de crear una ficha clinica
    this.servicioServicio.getServiciosPorFichaClinica(this.fichaclinica.idFichaClinica).subscribe(
       entity=>{
         this.servicios=entity.lista
        console.log('servicios ',this.servicios) 
      },
     error=>{
       console.log("Error al traer personas para la ficha clinica ",error.error)
     }
    );
  }
  
  editServicio(p: Servicio) {
    this.router.navigate(['/servicio/']);
  }

}
