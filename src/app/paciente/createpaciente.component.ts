import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/servicepaciente.service';

@Component({
    selector: 'app-paciente',
    templateUrl: 'createpaciente.component.html'
})

export class CreatePaciente {
    paciente: Paciente = new Paciente();
    constructor(private pacienteService: PacienteService, private router: Router) { }

    createPaciente() {
        console.log(this.paciente);
        if(this.checkFields()){
            this.pacienteService.createPaciente(this.paciente).subscribe(
                () => {
                    swal.fire({
                        title: 'Creado!',
                        text: 'El nuevo paciente fue creado exitosamente.',
                        icon: 'success',
                        customClass: {
                        confirmButton: 'btn btn-success',
                        },
                        buttonsStyling: false,
                    }).then(() => {
                        this.router.navigate(['/paciente'])
                    });
                }, 
                error => {
                    console.log(error);
                    let message = 'El paciente no pudo ser creado. \n'
                    message += error.error ? error.error : error.message;
                    swal.fire({
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
    }

    checkFields() { 
        
        return true;
    }



}
