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

    //actualmente se imprimen en consola estas listas
    this.getFichasClinicasPorFisioterapeuta();
    this.getFichasClinicasPorPaciente();
    this.getFichasClinicasPorFechaDesde();
    this.getFichasClinicasPorFechaHasta();
    this.getFichasClinicasPorFechaDesdeHasta();
    this.getFichasClinicasPorIdTipoProducto();
  }

  getFichasClinicas(): void {
    this.servicioFichaClinica.getFichasClinicas().subscribe(
      entity => this.fichasclinicas = entity.lista,
      error => console.log('no se pueden conseguir las fichas clinicas')
    );
  }

  getFichasClinicasPorFisioterapeuta(): void{ //por ahora dejamos el id 2 para probar
    this.servicioFichaClinica.getFichasClinicasPorFisioterapeuta(2).subscribe(
      entity => console.log('lista por terapeuta: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por id 2 de terapeuta')
    )
  }

  getFichasClinicasPorPaciente(): void{ //por ahora dejamos el id 97 para probar
    this.servicioFichaClinica.getFichasClinicasPorPaciente(97).subscribe(
      entity => console.log('lista por paciente: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por id 97 de paciente')
    )
  }

  getFichasClinicasPorFechaDesde(): void{ //todos los registros están en null en este campo
    this.servicioFichaClinica.getFichasClinicasPorFechaDesde(null).subscribe(
      entity => console.log('lista por fechaDesde: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por fechaDesde')
    )
  }

  getFichasClinicasPorFechaHasta(): void{ //puse un formato de ejemplo pero todos los valores están en null
    this.servicioFichaClinica.getFichasClinicasPorFechaHasta('20190901').subscribe(
      entity => console.log('lista por fechaHasta: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por fechaHasta')
    )
  }

  getFichasClinicasPorFechaDesdeHasta(): void{ //combinación de ambos anteriores
    this.servicioFichaClinica.getFichasClinicasPorFechaDesdeHasta('20190901','20190901').subscribe(
      entity => console.log('lista por fechaDesdeHasta: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por fechaDesdeHasta')
    )
  }
  
  // (para este campo lógicamente antes hay que filtrar por categoria). A que se refiere esto??
  getFichasClinicasPorIdTipoProducto(): void{ //filtrar por subcategoria. Para el ejemplo id 38 
    this.servicioFichaClinica.getFichasClinicasPorSubcategoria(38).subscribe(
      entity => console.log('lista por subcategoria: ',entity.lista,' elementos: ',entity.totalDatos),
      error => console.log('no se puede filtrar las fichas por subcategoria')
    )
  }
}
