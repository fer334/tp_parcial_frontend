import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { PresentacionProducto,Producto } from '../model/presentacionProducto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PresentacionProductoService {
  private api:string= `${environment.url_api}`
  constructor(private http: HttpClient) { }

  getPresentacionProductos():Observable<listadatos<PresentacionProducto>>{
      let resource = "stock-pwfe/presentacionProducto"
      let endPoint=this.api+resource
      return this.http.get<listadatos<PresentacionProducto>>(endPoint)
  }


 /* Servicio que retorna la lista de presentacion producto por Id tipo de Producto */
  getPrentacionProductoPorIdTipoProducto(idTipoProducto):Observable<listadatos<PresentacionProducto>>{
    let resource=`stock-pwfe/presentacionProducto`
    let endpoint=this.api+resource
    let payload=JSON.stringify({idProducto:{idTipoProducto:{idTipoProducto:idTipoProducto}}});
    return this.http.get<listadatos<PresentacionProducto>>(endpoint,{params:{ejemplo:payload}})
  }


  /*Servicio que retorna la lista de presentacion producto por nombre */
  getPresentacionProductoPorNombre(nombre):Observable<listadatos<PresentacionProducto>>{
      let resource=`stock-pwfe/presentacionProducto`
      let endpoint=this.api+resource
      let payload=JSON.stringify({nombre:nombre})
      return this.http.get<listadatos<PresentacionProducto>>(endpoint,{params:{ejemplo:payload}})
  } 


  /*Servico que obtiene la lista de presentacion Producto por Id Tipo Producto */
  getProductosPorIdTipoProducto(idTipoProducto):Observable<listadatos<PresentacionProducto>>{
    let resource=`stock-pwfe/producto`
    let endpoint=this.api+resource
    let payload=JSON.stringify({idTipoProducto:{idTipoProducto:idTipoProducto}})
    //cambiar despues el valor de retorno de estee
    return this.http.get<listadatos<PresentacionProducto>>(endpoint,{params:{ejemplo:payload}})
  } 

  /* Servicio que obtiene el precioVenta por idPresentacionProducto */
  getPrecioByPresentacionProducto(idPresentacionProductoTransient):Observable<listadatos<PresentacionProducto>>{
    let resource=`stock-pwfe/existenciaProducto`
    let endpoint=this.api+resource
    let payload=JSON.stringify({idPresentacionProductoTransient:idPresentacionProductoTransient})
    //cambiar despues el valor de retorno de este
    return this.http.get<listadatos<PresentacionProducto>>(endpoint,{headers:{usuario:"usuario2"},params:{ejemplo:payload}})
  } 


  /*Servicio que crea un nuevo presentacion Producto recibido desde un Form */
  createPresentacionProducto(p : PresentacionProducto):Observable<PresentacionProducto>{
    let resource=`stock-pwfe/presentacionProducto`
    let endpoint=this.api+resource
    return this.http.post<PresentacionProducto>(endpoint,JSON.stringify(p),{headers:{'Content-Type': 'application/json'}})
  }

  /* Servicio que obtiene la lista de Productos */
  getProductos(): Observable<listadatos<Producto>>{
    let resource=`stock-pwfe/producto`
    let endpoint=this.api+resource
    return this.http.get<listadatos<Producto>>(endpoint)
  }

  /* Servicio que actualiza una nueva presentacion Producto recibido desde un Form */
  actualizarPresentacionProducto(p : PresentacionProducto):Observable<PresentacionProducto>{
    let resource=`stock-pwfe/presentacionProducto`
    let endpoint=this.api+resource
    return this.http.put<PresentacionProducto>(endpoint,JSON.stringify(p),{headers:{'Content-Type': 'application/json'}})
  }

  /* Servicio para obtener una presentacion Producto. */
  getPresentacionProducto(idPresentacionProducto:number): Observable <PresentacionProducto > {
    let resource=`stock-pwfe/presentacionProducto/${idPresentacionProducto}`
    let endpoint=this.api+resource
    return this.http.get<PresentacionProducto>(endpoint)
  }
  
  /* Servicio para eliminar una Presentacion Producto */
  deletePresentacionProducto(idPresentacionProducto: number): Observable<number> {
    let resource=`stock-pwfe/presentacionProducto/${idPresentacionProducto}/`
    let endpoint=this.api+resource
    return this.http.delete<number>(endpoint)
  }

}
