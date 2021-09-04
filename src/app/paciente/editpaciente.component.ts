import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { Paciente } from '../model/paciente';
import { PacienteService } from '../service/servicepaciente.service';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: 'editpaciente.component.html',
})
export class EditPaciente implements OnInit {
  paciente: Paciente;
  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.paciente.idPersona = id
      this.pacienteService.getPaciente(id).subscribe((paciente) => {
          console.log(paciente);
        this.paciente = paciente;
        
      });
    });
  }

  createPaciente() {
    console.log(this.paciente);
    if (this.checkFields()) {
      this.pacienteService.createPaciente(this.paciente).subscribe(
        () => {
          swal
            .fire({
              title: 'Creado!',
              text: 'El nuevo paciente fue creado exitosamente.',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false,
            })
            .then(() => {
              this.router.navigate(['/paciente']);
            });
        },
        (error) => {
          console.log(error);
          let message = 'El paciente no pudo ser creado. \n';
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
