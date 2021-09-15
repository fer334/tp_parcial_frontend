import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Detalle } from '../model/detalle';
import { FichaClinica } from '../model/ficha-clinica';
import { Paciente } from '../model/paciente';
import { Servicio } from '../model/servicio';
import { ServicefichaclinicaService } from '../service/servicefichaclinica.service';
import { PacienteService } from '../service/servicepaciente.service';

// import { Paciente } from '../model/paciente';
// import { PacienteService } from '../service/servicepaciente.service';

@Component({
	selector: 'app-servicio',
	templateUrl: 'createservicio.component.html',
})
export class CreateServicioComponent {
	data: Servicio = new Servicio();
	details: Detalle = new Detalle();
    fichas: FichaClinica[] = [];

	constructor(
        private fichasService: ServicefichaclinicaService ,
		private router: Router
	) {
        this.fichasService.getFichasClinicas().subscribe(
            (data) => {
                this.fichas = data.lista;
            }
        );
    }

	createButton() {
		console.log(this.data);
		// return;
		if (this.checkFields()) {
			// this.horarioService.createHorario(this.data).subscribe(
			// 	() => {
			// 		swal.fire({
			// 			title: 'Actualizado!',
			// 			text: 'El nuevo horario fue actualizado exitosamente.',
			// 			icon: 'success',
			// 			customClass: {
			// 				confirmButton: 'btn btn-success',
			// 			},
			// 			buttonsStyling: false,
			// 		}).then(() => {
			// 			this.router.navigate(['/horario']);
			// 		});
			// 	},
			// 	(error) => {
			// 		console.log(error);
			// 		let message = 'El paciente no pudo ser editado. \n';
			// 		message += error.error ? error.error : error.message;
			// 		swal.fire({
			// 			title: 'Error!',
			// 			text: message,
			// 			icon: 'error',
			// 			customClass: {
			// 				confirmButton: 'btn btn-danger',
			// 			},
			// 			buttonsStyling: false,
			// 		});
			// 	}
			// );
		}
	}

	checkFields() {
		return true;
	}
}
