import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva/reserva.service';
import { Reserva } from '../model/reserva';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[]=[]
  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.fetchReservas()
  } 
  fetchReservas():void {
    this.reservaService.getReservas().subscribe(
      entity=>{
        this.reservas=entity.lista
        console.log("Lista de Reserva",this.reservas,this.reservas.length)

      },
      error=>console.log("error",error)
    )
  }
  
}
