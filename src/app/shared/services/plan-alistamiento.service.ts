import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';
import { dataresult } from '../model/core/dataresult.model';
import { retry, catchError, map, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Municipio {
  iD_Divipola: number;
  municipio: string;
  instituciones: Instituciones[];
}

export interface Instituciones {
  iD_IE: number;
  institucionEducativa: string;
  sedes: SedesIE[];
}

export interface SedesIE {
  iD_Sede: number;
  sede: string;
}

export interface Ruta {
  id?: number;
  iD_Ruta: number;
  iD_Sede: number;
  numRuta: number;
  numeracion: number;
  recibeGas: boolean;
  recibeAgua: boolean;
  estado: boolean;
  auditoria: string;
}

export interface SedeRuta {
  iD_SedeRuta: number;
  iD_Ruta: number;
  iD_Sede: number;
  sede: string;
  institucionEdu: string;
  municipio: string;
  recibeGas: boolean;
  ordenRuta: number;
  recibeAgua: boolean;
}

export interface ProductosRuta {
  iD_TipoProductoRuta: number;
  iD_Ruta: number;
  producto: string;
  iD_TipoPeriocidad: number;
  auditoria: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlanAlistamientoService {
  private baseURL: string = environment.apiURI_Contratos;
  private idAlistamiento = new BehaviorSubject<number>(0);
  idPlan = this.idAlistamiento.asObservable();

  constructor(private http: HttpClient) {}

  public getSedesPorAsignar(
    idPlanAlistamiento: number
  ): Observable<dataresult> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/PlanAlistamientoRutasSedesPorAsignarGet/${idPlanAlistamiento}`
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  public getSedesPorAsignarModeloOperacion(
    idPlanAlistamiento: number,
    idMOperacion: number
  ): Observable<dataresult> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/PlanAlistamientoRutasSedesPorPlanAlistamientoModelo/${idPlanAlistamiento}/${idMOperacion}`
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  public getInfoMunicipios(
    idPlanAlistamiento: number
  ): Observable<Municipio[]> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/PlanAlistamientoRutasSedesPlanAlisMunicipio/${idPlanAlistamiento}`
      )
      .pipe(
        map((data) => data.result),
        retry(0),
        catchError(this.handleError)
      );
  }

  getPeriodicidad(): Observable<any> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}ContratosContratos/ContratosTiposPeriodicidadGetAll`
      )
      .pipe(
        map((data) => data.result),
        retry(0),
        catchError(this.handleError)
      );
  }

  getSedesPorRuta(idRuta: number): Observable<SedeRuta[]> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/PlanAlistamientoRutasSedesPorRuta/${idRuta}`
      )
      .pipe(
        map((data) => data.result),
        retry(0),
        catchError(this.handleError)
      );
  }

  getRutas(idPlanAlistamiento: number): Observable<any> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}PlanAlistamientoRutasRutas/GetAllPlanAlistamientoRutasRutas/${idPlanAlistamiento}`
      )
      .pipe(
        map((data) => data.result),
        retry(0),
        catchError(this.handleError)
      );
  }

  
  AddRutas(param: any): Observable<dataresult> {
  return this.http.post<dataresult>(`${this.baseURL}PlanAlistamientoRutasRutas/AddPlanAlistamientoRutasRutas`, param)
  .pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
}

  agregarPlanRutas(rutas: Ruta[]) {
    return from(rutas).pipe(
      concatMap(
        (ruta) =>
          <Observable<any>>(
            this.http
              .post(
                `${this.baseURL}PlanAlistamientoRutasRutasSedes/AddPlanAlistamientoRutasRutasSedes`,
                ruta
              )
              .pipe(catchError(this.handleError))
          )
      )
    );
  }

  agregarProductosRuta(productosRuta: ProductosRuta[]): Observable<any> {
    return from(productosRuta).pipe(
      concatMap(
        (producto) =>
          <Observable<any>>(
            this.http
              .put(
                `${this.baseURL}PlanAlistamientoRutasRutasSedes/UpdatePlanRutasTiposProductoRutaPlan`,
                producto
              )
              .pipe(catchError(this.handleError))
          )
      )
    );
  }

  getProductosRuta(idRuta: number): Observable<ProductosRuta[]> {
    return this.http
      .get<dataresult>(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/PlanAlistamientoRutasTiposProductoRutaPlan/${idRuta}`
      )
      .pipe(
        map((data) => data.result),
        retry(0),
        catchError(this.handleError)
      );
  }

  get_HistoricoAprobacionesPorPlan(idPlanAlistamiento: number): Observable<any> {
    return this.http
      .delete(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/HistoricoAprobacionesPorPlan/${idPlanAlistamiento}`
      )
      .pipe(catchError(this.handleError));
  }
  createAprobacionPlanRuta(param: any): Observable<dataresult> {
    return this.http.post<dataresult>(`${this.baseURL}PlanAlistamientoRutasRutas/createAprobacionPlanRuta`, param)
    .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }
  eliminarRuta(idRuta: number, solosede: number): Observable<any> {
    return this.http
      .delete(
        `${this.baseURL}PlanAlistamientoRutasRutasSedes/DeletePlanAlistamientoRutasRutasSedes/${idRuta}/${solosede}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  public setIdPlanAlistamiento(id: number) {
    this.idAlistamiento.next(id);
  }
}
