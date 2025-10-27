import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PA_PrioAsistidaModel } from 'src/app/shared/model/PA_PrioAsistidaModel';



@Injectable({
  providedIn: 'root'
})
export class PAPrioAsistidaService  {

  constructor(private http: HttpClient) {

  }
  public apiurl = environment.baseUrlAPI_Priorizacion + "PA_PrioAsistida";
    // CRUD:  Metodo GetAll para traer todos los registros
    getPA_PrioSedeAsistida (form: any): Observable<PA_PrioAsistidaModel> {

      let params = new HttpParams().set('Id_ETC', form.id_ETC);
      params = form.id_gradosedeJornada ? params.append('id_gradosedeJornada', form.id_gradosedeJornada) : params;
      params = form.tipoMunicipio ? params.append('Id_TipoMunicipio', form.tipoMunicipio) : params;
      params = form.municipio ? params.append('Id_Divipola', form.municipio) : params;
      params = form.jornada ? params.append('jor', form.jornada) : params;
      params = form.nivelEducativo ? params.append('nivel', form.nivelEducativo) : params;
      params = form.zona ? params.append('zona', form.zona) : params;
      params = form.criteriosVulnerabilidad ? params.append('Vulnerabilidad', form.criteriosVulnerabilidad) : params;
      params = form.modeloOperacion ? params.append('modelo', form.modeloOperacion) : params;
      params = form.modalidad ? params.append('modalidad', form.modalidad) : params;
      params = form.tipoRacion ? params.append('tipoRac', form.tipoRacion) : params;
      params = form.id_vigencia ? params.append('Id_Vingencia', form.id_vigencia) : params;
      params = form.completar ? params.append('relleno', form.completar) : params.append('relleno', '0');
      params = form.auditoria ? params.append('auditoria', form.auditoria) : params;



      const url = `${this.apiurl}/GetAll/`;

      return this.http
        .get<PA_PrioAsistidaModel>(url, { params: params })
        .pipe(
          tap(),   // para poder realizar efectos secundrios
          retry(0), // reintenta en caso de falla hasta 2 veces
        );
    }
}
