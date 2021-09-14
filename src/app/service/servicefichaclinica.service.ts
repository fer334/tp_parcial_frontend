import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listadatos } from '../model/datos';
import { FichaClinica } from '../model/ficha-clinica';

@Injectable({
  providedIn: 'root'
})
export class ServicefichaclinicaService {
  private api: string = 'http://181.123.243.5:8080/stock-pwfe/fichaClinica';

  constructor(private http: HttpClient) { }

  getFichasClinicas(): Observable <listadatos<FichaClinica>> {
    return this.http.get<listadatos<FichaClinica>>(this.api);
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
    let payload = JSON.stringify({idTipoProducto:{idTipoProducto:"${idSubcategoria}"}});
    return this.http.get<listadatos<FichaClinica>>(this.api,{params:{ejemplo:payload}});
  }

  // (al cargar la pantalla de registro de ficha el cliente puede
  // preseleccionarse si existe una reserva de turno, el campo de observación es opcional, la fecha
  // se carga en el backend automáticamente) PREGUNTAR A JESÚS LO DE RESERVA
  agregarFichaClinica(fc:FichaClinica): Observable<FichaClinica> {
    return this.http.post<FichaClinica>(this.api, fc)
    .pipe(
      tap(
        data => console.log("ficha clinica añadida "+data),
        error => console.log("error al añadir ficha clinica: "+error.error)
      )
    );
  }
}
