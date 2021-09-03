import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { listadatos } from '../model/datos';

@Injectable({
  providedIn: 'root'
})
export class ServicecategoriaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/categoria";
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.api);
   }
   
}
