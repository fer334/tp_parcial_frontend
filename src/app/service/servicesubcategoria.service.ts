import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Subcategoria } from '../model/subcategoria';
import { tap } from 'rxjs/operators';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ServicesubcategoriaService {
  private api: string = "http://181.123.243.5:8080/stock-pwfe/tipoProducto";

  constructor( private http: HttpClient ) { }

  getSubcategorias(): Observable<listadatos<Subcategoria>> {
    return this.http.get<listadatos<Subcategoria>>(this.api); 
  }

  getSubcategoriaPorId(id: number): Observable<Subcategoria> {
    const apiconid = this.api+'/'+String(id);
    return this.http.get<Subcategoria>(apiconid);
  }

  getSubcategoriasPorDescripcion(descripcion: string): Observable<listadatos<Subcategoria>> {
    let payload = JSON.stringify({descripcion:descripcion});
    return this.http.get<listadatos<Subcategoria>>(this.api,{params:{ejemplo:payload}});
  }

  getSubcategoriasPorIdCategoria(idCategoria: number): Observable<listadatos<Subcategoria>> {
    let payload = JSON.stringify({idCategoria:{idCategoria: idCategoria}});
    return this.http.get<listadatos<Subcategoria>>(this.api,{params:{ejemplo:payload}});
  }

  agregarSubcategorias(sc:Subcategoria): Observable<Subcategoria> {
    return this.http
    .post<Subcategoria>(this.api, sc)
    .pipe(
      tap(
        data => console.log('subcategoria agregada'+data),
        error => console.log('error en sc '+error)
      )
    );
  }

  editarSubcategoria(sc:Subcategoria): Observable<Subcategoria>{
    return this.http.put<Subcategoria>(this.api, sc).pipe(
      tap(
        data => console.log('editada sc '+data),
        error => console.log('el error al editar la sc es '+error.error)
      )
    );
  }

  eliminarSubcategoria(id: number): Observable<Subcategoria>{
    console.log('se está borrando la subcategoria ', this.api +'/'+id);
    return this.http.delete<Subcategoria>(this.api + '/' + id);
  }
  
}
