import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listadatos } from '../model/datos';
import { FichaClinica, Local } from '../model/ficha-clinica';

@Injectable({
  providedIn: 'root'
})
export class ServicefichaclinicaService {
  private api: string = 'http://181.123.243.5:8080/stock-pwfe/fichaClinica';

  constructor(private http: HttpClient) { }

  getFichasClinicas(): Observable <listadatos<FichaClinica>> {
    return this.http.get<listadatos<FichaClinica>>(this.api);
  }
  
  getFichaClinicaPorId(id: number): Observable<FichaClinica> {
    return this.http.get<FichaClinica>(this.api+'/'+id);
  }

  getFichasClinicasPorFisioterapeuta(fisioterapeutaId: number): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({idEmpleado:{idPersona:fisioterapeutaId}});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }

  getFichasClinicasPorPaciente(pacienteId: number): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({idCliente:{idPersona:pacienteId}});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }

  getFichasClinicasPorFechaDesde(fechaDesde: string): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({fechaDesdeCadena:fechaDesde});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }
  
  getFichasClinicasPorFechaHasta(fechaHasta: string): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({fechaHastaCadena:fechaHasta});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }

  getFichasClinicasPorFechaDesdeHasta(fechaDesde: string, fechaHasta: string): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({fechaDesdeCadena:fechaDesde,fechaHastaCadena:fechaHasta});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }
  
  getFichasClinicasPorSubcategoria(idSubcategoria: number): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({idTipoProducto:{idTipoProducto:idSubcategoria}});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }

  getFichasClinicasPorCategoria(idCategor: number): Observable<listadatos<FichaClinica>> {
    let payload = JSON.stringify({idTipoProducto:{idCategoria:{idCategoria:idCategor}}});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }

  // (al cargar la pantalla de registro de ficha el cliente puede
  // preseleccionarse si existe una reserva de turno, el campo de observación es opcional, la fecha
  // se carga en el backend automáticamente) PREGUNTAR A JESÚS LO DE RESERVA
  agregarFichaClinica(fc:FichaClinica): Observable<FichaClinica> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario2'
    });
    return this.http.post<FichaClinica>(this.api, fc, {headers:headers})
    .pipe(
      tap(
        data => console.log("ficha clinica añadida "+data),
        error => console.log("error al añadir ficha clinica: "+error.error)
      )
    );
  }

  editarFichaClinica(fc:FichaClinica): Observable<FichaClinica>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario2'
    });
    let body = JSON.stringify({
      "idFichaClinica":fc.idFichaClinica,
      "observacion":fc.observacion
    });
    return this.http.put<FichaClinica>(this.api, body, {headers:headers}).pipe(
      tap(
        data => console.log('editada fc '+data.motivoConsulta),
        error => console.log('el error al editar la fc es '+error.error)
      )
    );
  }

  getLocales(): Observable<listadatos<Local>>{
    return this.http.get<listadatos<Local>>("http://181.123.243.5:8080/stock-pwfe/local");
  } 
}
