import { Component, OnInit } from '@angular/core';
import { FichaClinica } from '../model/ficha-clinica';
import { ServicefichaclinicaService } from '../service/servicefichaclinica.service';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {
  fichasclinicas: FichaClinica[] = [];
  constructor(private servicioFichaClinica: ServicefichaclinicaService) { }

  ngOnInit(): void {
    this.getFichasClinicas();
  }

  getFichasClinicas(): void {
    this.servicioFichaClinica.getFichasClinicas().subscribe(
      entity => this.fichasclinicas = entity.lista,
      error => console.log('no se pueden conseguir las fichas clinicas')
    );
  }

}
