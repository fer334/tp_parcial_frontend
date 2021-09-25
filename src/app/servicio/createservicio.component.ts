import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class CreateServicioComponent {
	data: Servicio = new Servicio();
	detail: Detalle = new Detalle();
    fichas: FichaClinica[] = [];
	categorias: Categoria[] = [];

	constructor(
        private fichasService: ServicefichaclinicaService,
		private categoriaService: ServicecategoriaService,
		private servicioService: ServicioService,
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
