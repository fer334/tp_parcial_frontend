import { Component, OnInit } from '@angular/core';
import { listadatos } from '../model/datos';
import { User } from '../model/user';
import { LoginService } from '../service/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private reservaService:LoginService ) { }

  ngOnInit(): void {
    this.fetchValidUsers()
  }
  //staates
  mensaje:string=""
  user:string
  password:string
  validUsers:User[]

  fetchValidUsers():void{
      this.reservaService.getValidUser().subscribe(
        entity=>{
            this.validUsers=entity.lista
        },
        error=>console.log("LoginError",error)
      )
  }
  validateLogin():void{
    console.log("validatiing",this.user,this.password)
    if(this.user && this.password){
      if(this.validUsers.find((item)=>item.usuarioLogin==this.user)){
        this.mensaje="Valido"
        localStorage.setItem("isLogged","true")
        localStorage.setItem("user",this.user)
      }else{
        this.mensaje="Incorrecto"
      }
    }else this.mensaje="Por favor completa sus datos"
  }
}
