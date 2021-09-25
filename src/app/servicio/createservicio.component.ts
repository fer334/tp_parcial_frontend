import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Categoria } from '../model/categoria';
import { Detalle } from '../model/detalle';
import { FichaClinica } from '../model/ficha-clinica';
import { Paciente } from '../model/paciente';
import { Servicio } from '../model/servicio';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicefichaclinicaService } from '../service/servicefichaclinica.service';
import { PacienteService } from '../service/servicepaciente.service';
import { ServicioService } from '../service/servicio.service';


@Component({
	selector: 'app-servicio',
	templateUrl: 'createservicio.component.html',
})
export class CreateServicioComponent implements OnInit{
	data: Servicio = new Servicio();
	detail: Detalle = new Detalle();
    fichas: FichaClinica[] = [];
	categorias: Categoria[] = [];
	fichaclinica: FichaClinica = new FichaClinica();

	constructor(
        private fichasService: ServicefichaclinicaService,
		private categoriaService: ServicecategoriaService,
		private servicioService: ServicioService,
		private servicioFichaClinica: ServicefichaclinicaService,
		private route: ActivatedRoute,
		private router: Router
	) {
        this.fichasService.getFichasClinicas().subscribe(
            (data) => {
                this.fichas = data.lista;
            }
        );
		this.categoriaService.getCategorias().subscribe(
			(data) => {
				this.categorias = data.lista;
			}
		);
    }

	ngOnInit(): void {
		//ver si viene de ficha clinica
		this.route.params.subscribe((params) =>{
			const id = +params['id']; // el + convierte el string id a number
			if (id != 0) {
			  //this.reserva.idReserva = id;
			  this.servicioFichaClinica.getFichaClinicaPorId(id).subscribe(
				(ficha) => {
				  this.fichaclinica = ficha;
				  this.data.idFichaClinica = this.fichaclinica.idFichaClinica;
				}
			  ); 
			}
		  });
	}

	createButton() {
		console.log(this.data);
		// return;
		if (this.checkFields()) {
			this.servicioService.createServicio(this.data).subscribe(()=>{
				swal.fire({
					title: 'Actualizado!',
					text: 'El nuevo servicio fue actualizado exitosamente.',
					icon: 'success',
					customClass: {
						confirmButton: 'btn btn-success',
					},
					buttonsStyling: false,
				}).then(() => {
					this.router.navigate(['/servicio']);
				});
			},(error)=>{
				console.log(error);
			});
		}
	}

	checkFields() {
		return true;
	}
}
