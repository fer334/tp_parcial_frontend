import { listadatos } from '../model/datos';
import { User } from '../model/user';
import { LoginService } from '../service/login/login.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  constructor(private reservaService:LoginService,private element: ElementRef,
      private route: Router,
    ) { 

    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    this.fetchValidUsers()
    var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 200);
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
      let user=this.validUsers.find((item)=>item.usuarioLogin==this.user)
      if(user){
        this.mensaje="Valido"
        localStorage.setItem("isLogged","true")
        localStorage.setItem("user",this.user)
        localStorage.setItem("idUser",user.idPersona+"")
        this.route.navigate([''])
        
      }else{
        this.mensaje="Incorrecto"
      }
    }else this.mensaje="Por favor completa sus datos"
  }
}
