import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from 'src/app/model/datos';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api:String= environment.url_api
  constructor(private http:HttpClient,private router:Router) { }

  getValidUser():Observable<listadatos<User>>{
    let resource="stock-pwfe/persona"
    let endPoint=this.api+resource
    return this.http.get<listadatos<User>>(endPoint,{params:{
      ejemplo:JSON.stringify({soloUsuariosDelSistema:true})
    }})
  }

  isLogged():void{
    if (!localStorage.getItem("isLogged")) this.router.navigate(['/login'])
  }
}
