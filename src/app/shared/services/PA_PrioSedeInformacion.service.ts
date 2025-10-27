import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PA_PrioSedeInformacionModel } from 'src/app/shared/model/PA_PrioSedeInformacion.model';


@Injectable({
    providedIn: 'root'
})
export class PAPrioSedeInformacionService {

    constructor(private http: HttpClient) {

    }
    public apiurl = environment.baseUrlAPI_Priorizacion + "PA_PrioSedeInformacion";
    // CRUD:  Metodo GetAll para traer todos los registros
    getPA_PrioSedeInformacion(idSede: any): Observable<PA_PrioSedeInformacionModel> {
        let params = new HttpParams().set('id_sede', idSede);

        const url = `${this.apiurl}/GetAll/`;

        return this.http
            .get<PA_PrioSedeInformacionModel>(url, { params: params })
            .pipe(
                tap(),   // para poder realizar efectos secundrios
                retry(0), // reintenta en caso de falla hasta 2 veces
            );
    }
}
