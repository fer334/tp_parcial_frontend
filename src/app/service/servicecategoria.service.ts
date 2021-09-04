import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { listadatos } from '../model/datos';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicecategoriaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/categoria";
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<listadatos<Categoria>> { //get para leer categorias
    return this.http.get<listadatos<Categoria>>(this.api);
  }
  
  agregarCategorias(c:Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.api, c).pipe(
      tap( //imprimir en consola el resultado o el error
        data => console.log('agregado'+data),
        error => console.log('error'+error)
      )
    );
  }
}
