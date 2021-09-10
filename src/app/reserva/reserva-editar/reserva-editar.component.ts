import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
@Component({
  selector: 'app-reserva-editar',
  templateUrl: './reserva-editar.component.html',
  styleUrls: ['./reserva-editar.component.css']
})
export class ReservaEditarComponent implements OnInit {
  
  constructor(private reservaService: ReservaService) { }
  ngOnInit(): void {
  }

}
