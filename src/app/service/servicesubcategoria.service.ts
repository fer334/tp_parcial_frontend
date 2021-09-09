import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Subcategoria } from '../model/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class ServicesubcategoriaService {
  private api: string = "http://181.123.243.5:8080/stock-pwfe/tipoProducto";

  constructor( private http: HttpClient ) { }

  getSubcategorias(): Observable<listadatos<Subcategoria>> {
    return this.http.get<listadatos<Subcategoria>>(this.api); 
  }
}
