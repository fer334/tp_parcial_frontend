import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { LoginService } from 'src/app/service/login/login.service';
import swal from 'sweetalert2';

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
  observacion:String=null
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
    },1)
  }

  cancelarReserva():void{
       this.reservaService.cancelarReserva(this.reserva.idReserva).subscribe(
        response=>{
          console.log("Se cancelo")
          this.showSwall(true,"Eliminado","Se ha cancelado Exitosamente la Reserva")
        },
        error=> {
          console.log("Error",error)
          this.showSwall(false,"Error!","No se a podido Eliminar la reserva")
        }
      )
  }
  guardar():void{
      this.reserva.flagAsistio=this.flagAsistio+""
      this.reserva.observacion=this.observacion?this.observacion+"":null
      let {idReserva,observacion,flagAsistio}=this.reserva

      this.reservaService.updateReserva({idReserva,observacion,flagAsistio}).subscribe(
          entity=>{
            console.log("Se actualizo Correctamente",entity)
            this.mensaje="La reserva se Actualizo Correctamente"
            this.showSwall(true,"Actualizado","Se ha actualizado Correctamente")
          },
          error=>{
            console.log("Error",error)
            this.mensaje="No se pudo actualizar la Reserva"
            this.showSwall(false,"Error!","No se a podido actualizar la reserva")
          }
      )
      
  }
  cancellConfirmation(){
    swal.fire({
      title: 'Estas Seguro',
      text: "Una vez cancelado la Reseva, no podras Revertirlo",
      icon: 'warning',
      showCancelButton: true,
      customClass:{
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText:"Cancelar",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.cancelarReserva()
      }
    })   
  }
  showSwall(type:boolean,title:string,text:string){
    if(type){
        swal.fire({
          title: title,
          text: text,
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-success",
          },
          icon: "success"
      }).then((result)=>{
        if(result.isConfirmed) this.goBack()
        else this.goBack()
      });
  }else{
      swal.fire({
        title: title,
        text: text,
        buttonsStyling: false,
        customClass:{
          confirmButton: "btn btn-info"
        }
      });
    }
  }
}
