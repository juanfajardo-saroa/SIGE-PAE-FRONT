import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PAPriorizacionesContratoModel } from '../model/PA_PriorizacionesContrato.model';




@Injectable({
    providedIn: 'root'
})
export class PAPriorizacionesContratoService {

    constructor(private http: HttpClient) {

    }
    public apiurl = environment.baseUrlAPI_Priorizacion + "PA_PriorizacionesContratoGetAllWithRel";
    // CRUD:  Metodo GetAll para traer todos los registros
    getPA_Priorizaciones(idSede: any): Observable<PAPriorizacionesContratoModel> {
        let params = new HttpParams().set('id_Sede', idSede);

        const url = `${this.apiurl}/GetAll/`;

        return this.http
            .get<PAPriorizacionesContratoModel>(url, { params: params })
            .pipe(
                tap(),   // para poder realizar efectos secundrios
                retry(0), // reintenta en caso de falla hasta 2 veces
            );
    }
}