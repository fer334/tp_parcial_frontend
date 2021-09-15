import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { LoginService } from 'src/app/service/login/login.service';
@Component({
  selector: 'app-reserva-editar',
  templateUrl: './reserva-editar.component.html',
  styleUrls: ['./reserva-editar.component.css']
})
export class ReservaEditarComponent implements OnInit {
  

  constructor(
    private reservaService: ReservaService,
    private routeNavigation: Router,
    private route: ActivatedRoute,
    private loginService:LoginService
    ) { }
  ngOnInit(): void {
    this.loginService.isLogged()
    let routeParams=this.route.snapshot.paramMap
    let idReserva= Number(routeParams.get('id'))
    this.getReserva(idReserva);
  }
  reserva:Reserva=new Reserva
  observacion:String=""
  flagAsistio:String=""
  mensaje:String=""

  getReserva(idReserva:number):void{
    this.reservaService.getReserva(idReserva).subscribe(
      entity=>{
          this.observacion=entity.observacion
          this.flagAsistio=entity.flagAsistio
          this.reserva=entity
        },
      error=>{
        console.log("Error",error)
      }
    )
  }

  goBack(): void{
    setTimeout(()=>{
      this.routeNavigation.navigate(['/reserva'])
    },1000)
  }

  cancelarReserva():void{
       this.reservaService.cancelarReserva(this.reserva.idReserva).subscribe(
        response=>{
          console.log("Se canceloo")
          this.mensaje="La reserva se cancelo Exitosamente"
          this.goBack()
        },
        error=> {
          console.log("Error",error)
          this.mensaje="No se pudo cancelar la Reserva"
          this.goBack()
        }
      )
  }
  guardar():void{

      this.reserva.flagAsistio=this.flagAsistio+""
      this.reserva.observacion=this.observacion+""
      let {idReserva,observacion,flagAsistio}=this.reserva

      this.reservaService.updateReserva({idReserva,observacion,flagAsistio}).subscribe(
          entity=>{
            console.log("Se actualizo Correctamente",entity)
            this.mensaje="La reserva se Actualizo Correctamente"
            this.goBack()
          },
          error=>{
            console.log("Error",error)
            this.mensaje="No se pudo actualizar la Reserva"
            this.goBack()
          }
      )
      
  }

}
