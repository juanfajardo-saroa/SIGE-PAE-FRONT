import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { PA_PrioSedeBeneficiariasService } from 'src/app/shared/services/PA_PrioSedeBeneficiarias.service';

import { PA_PrioSedeBeneficiariasModel } from 'src/app/shared/model/PA_PrioSedeBeneficiariasModel';

@Injectable({
  providedIn: 'root'
})
export class CustomPAPrioSedeBeneficiariasServiceService extends PA_PrioSedeBeneficiariasService {

  constructor(private http2: HttpClient,private messageService2:MessageService) {
    super(http2, messageService2);
  }

    // CRUD:  Metodo GetAll para traer todos los registros
    getPA_PrioSedeBeneficiariasList2(prioSedeBeneficiarias: PA_PrioSedeBeneficiarias): Observable<PA_PrioSedeBeneficiariasModel> {
      let params = new HttpParams().set('id_ETC', prioSedeBeneficiarias.id_ETC);
      params = prioSedeBeneficiarias.Id_TipoMunicipio ? params.append('Id_TipoMunicipio', prioSedeBeneficiarias.Id_TipoMunicipio) : params;
      params = prioSedeBeneficiarias.Id_Municipio ? params.append('Id_Municipio', prioSedeBeneficiarias.Id_Municipio) : params;
      params = prioSedeBeneficiarias.Id_InstEducativa ? params.append('Id_InstEducativa', prioSedeBeneficiarias.Id_InstEducativa) : params;
      params = prioSedeBeneficiarias.Id_sede ? params.append('Id_sede', prioSedeBeneficiarias.Id_sede) : params;
      params = prioSedeBeneficiarias.Id_Jornada ? params.append('Id_Jornada', prioSedeBeneficiarias.Id_Jornada) : params;
      params = prioSedeBeneficiarias.Id_NivelEducativo ? params.append('Id_NivelEducativo', prioSedeBeneficiarias.Id_NivelEducativo) : params;
      params = prioSedeBeneficiarias.Id_Zona ? params.append('Id_Zona', prioSedeBeneficiarias.Id_Zona) : params;
      params = prioSedeBeneficiarias.Id_CriterioVul ? params.append('Id_CriterioVul', prioSedeBeneficiarias.Id_CriterioVul) : params;
      params = prioSedeBeneficiarias.priorizadaPAE != null ? params.append('priorizadaPAE', prioSedeBeneficiarias.priorizadaPAE) : params;


      // const url = `${this.apiurl}/GetAll(${PA_PrioSedeBeneficiarias.id_ETC},${PA_PrioSedeBeneficiarias.Id_TipoMunicipio},${PA_PrioSedeBeneficiarias.Id_Municipio},${PA_PrioSedeBeneficiarias.Id_InstEducativa},${PA_PrioSedeBeneficiarias.Id_sede},${PA_PrioSedeBeneficiarias.Id_Jornada},${PA_PrioSedeBeneficiarias.Id_NivelEducativo},${PA_PrioSedeBeneficiarias.Id_Zona,PA_PrioSedeBeneficiarias.Id_CriterioVul,PA_PrioSedeBeneficiarias.Id_EstadoPrio})/`;
      // const url = `${this.apiurl}/GetAll/`;
      const url = `${this.apiurl}/GetAll/`;

      return this.http2
        .get<PA_PrioSedeBeneficiariasModel>(url, { params: params })
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
    }
    getPA_PrioSedeBeneficiariasList3(prioSedeBeneficiarias: PA_PrioSedeBeneficiarias): Observable<PA_PrioSedeBeneficiariasModel> {
      let params = new HttpParams().set('id_ETC', prioSedeBeneficiarias.id_ETC);
      params = prioSedeBeneficiarias.Id_TipoMunicipio ? params.append('Id_TipoMunicipio', prioSedeBeneficiarias.Id_TipoMunicipio) : params;
      params = prioSedeBeneficiarias.Id_Municipio ? params.append('Id_Municipio', prioSedeBeneficiarias.Id_Municipio) : params;
      params = prioSedeBeneficiarias.Id_InstEducativa ? params.append('Id_InstEducativa', prioSedeBeneficiarias.Id_InstEducativa) : params;
      params = prioSedeBeneficiarias.Id_sede ? params.append('Id_sede', prioSedeBeneficiarias.Id_sede) : params;
      params = prioSedeBeneficiarias.Id_Jornada ? params.append('Id_Jornada', prioSedeBeneficiarias.Id_Jornada) : params;
      params = prioSedeBeneficiarias.Id_NivelEducativo ? params.append('Id_NivelEducativo', prioSedeBeneficiarias.Id_NivelEducativo) : params;
      params = prioSedeBeneficiarias.Id_Zona ? params.append('Id_Zona', prioSedeBeneficiarias.Id_Zona) : params;
      params = prioSedeBeneficiarias.Id_CriterioVul ? params.append('Id_CriterioVul', prioSedeBeneficiarias.Id_CriterioVul) : params;
      params = prioSedeBeneficiarias.priorizadaPAE != null ? params.append('priorizadaPAE', prioSedeBeneficiarias.priorizadaPAE) : params;


      // const url = `${this.apiurl}/GetAll(${PA_PrioSedeBeneficiarias.id_ETC},${PA_PrioSedeBeneficiarias.Id_TipoMunicipio},${PA_PrioSedeBeneficiarias.Id_Municipio},${PA_PrioSedeBeneficiarias.Id_InstEducativa},${PA_PrioSedeBeneficiarias.Id_sede},${PA_PrioSedeBeneficiarias.Id_Jornada},${PA_PrioSedeBeneficiarias.Id_NivelEducativo},${PA_PrioSedeBeneficiarias.Id_Zona,PA_PrioSedeBeneficiarias.Id_CriterioVul,PA_PrioSedeBeneficiarias.Id_EstadoPrio})/`;
      // const url = `${this.apiurl}/GetAll/`;
      const url = `${this.apiurl}/GetAll/`;

      return this.http2
        .get<PA_PrioSedeBeneficiariasModel>(url, { params: params })
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
          catchError(this.handleError)  // en caso de error usa el Handle error
        );
    }
    
}

export class PA_PrioSedeBeneficiarias{
  id_ETC?: number;
  Id_TipoMunicipio?: number = null;
  Id_Municipio?: number = null;
  Id_InstEducativa?: number = null;
  Id_sede?: number = null;
  Id_Jornada?: number = null;
  Id_NivelEducativo?: number = null;
  Id_Zona?: number = null;
  Id_CriterioVul?: number = null;
  priorizadaPAE?: boolean = null;
}
