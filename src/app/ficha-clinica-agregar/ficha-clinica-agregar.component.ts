import { Component, OnInit } from '@angular/core';
import { FichaClinica } from '../model/ficha-clinica';
import { ServicefichaclinicaService } from '../service/servicefichaclinica.service';

@Component({
  selector: 'app-ficha-clinica-agregar',
  templateUrl: './ficha-clinica-agregar.component.html',
  styleUrls: ['./ficha-clinica-agregar.component.css']
})
export class FichaClinicaAgregarComponent implements OnInit {
  fichaclinica: FichaClinica = new FichaClinica();
  mensaje: string = ""

  constructor(private servicioFichaClinica: ServicefichaclinicaService) { }

  ngOnInit(): void {
  }

  guardar(): void{
    this.servicioFichaClinica.agregarFichaClinica(this.fichaclinica).subscribe(
      () => {
        this.mensaje = "Agregado exitosamente"
      },
      error => this.mensaje = "Error al agregar ficha: "+ error.error
    );
  }

}
