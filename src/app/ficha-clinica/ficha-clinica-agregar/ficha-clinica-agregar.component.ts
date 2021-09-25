import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import Swal from 'sweetalert2';
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
  reserva: Reserva = new Reserva();
  clienteReserva: Paciente = new Paciente();
  empleadoReserva: Paciente = new Paciente();

  constructor(private servicioFichaClinica: ServicefichaclinicaService,
    private servicioReserva: ReservaService,
    private servicioSubcategoria: ServicesubcategoriaService,
    private servicioPersona: PacienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //ver si viene de reserva
    this.route.params.subscribe((params) =>{
      const id = +params['id']; // el + convierte el string id a number
      if (id != 0) {
        //this.reserva.idReserva = id;
        this.servicioReserva.getReserva(id).subscribe(
          (reserva) => {
            this.reserva = reserva;
            this.cargarPersonasReserva();
          }
        ); 
      }
    });
    
    this.traerSubCategorias();
    this.traerPersonas();
    this.traerLocales();
  }

  guardar(): void{
    this.servicioFichaClinica.agregarFichaClinica(this.fichaclinica).subscribe(
      () => {
        this.mensaje = "Agregado exitosamente";
        Swal.fire({
          title: 'Creada!',
          text: 'La nueva Ficha Clínica fue creada exitosamente.',
          icon: 'success',
          customClass: {
          confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        }).then(() => {
            this.router.navigate(['/ficha_clinica'])
        });
      },
      error =>{ this.mensaje = "Error al agregar ficha: ";
        this.mensaje += error.error ? error.error : error.message;
        Swal.fire({
          title: 'Error!',
          text: this.mensaje,
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

  cargarPersonasReserva(): void {
    //si existe reserva cargar el cliente y el empleado
    if (this.reserva) {
      console.log('viene de una reserva ',this.reserva);
      this.servicioPersona.getPaciente(this.reserva.idCliente.idPersona).subscribe(
        (cli) => {
          this.clienteReserva = cli;
        },
        error =>{ console.log('error al traer cliente ',error.error)}
      );
      this.servicioPersona.getPaciente(this.reserva.idEmpleado.idPersona).subscribe(
        (emp) => {
          this.empleadoReserva = emp;
          console.log(this.empleadoReserva.nombre,' y ',this.clienteReserva.nombre);
        }
      );
    };
  }
  

}
