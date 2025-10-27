import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { PA_PrioSedeBeneficiariasModel } from 'src/app/shared/model/PA_PrioSedeBeneficiariasModel';

@Injectable({
  providedIn: 'root'
})
export class PA_Paso1FinService  {

  constructor(private http: HttpClient,private messageService2:MessageService) {

  }
  public apiurl = environment.baseUrlAPI_Priorizacion + "pa_Paso1Fin";
    // CRUD:  Metodo GetAll para traer todos los registros
    getPA_Paso1Fin(idETC: number): Observable<PA_PrioSedeBeneficiariasModel> {
      let params = new HttpParams().set('id_ETC', idETC);

      const url = `${this.apiurl}/GetAll`;

      return this.http
        .get<PA_PrioSedeBeneficiariasModel>(url, { params: params })
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
        );
    }

}

