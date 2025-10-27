export interface DetalleSedesModel {
  municipio:string;
  institucionEducativa:string;
  sede:string;
  matriculaSIMAT: number;
  porEstudiantesSISBEN?: number;
  priorizadaPAE?:boolean;
  modeloOperacionTradicional:string;
  modeloOperacionEmergencia:string;

  idMunicipio:number;
  idInstitucionEducativa:number;
  idSede:number;
  //idMatriculaSIMAT: number;
  idPriorizadaPAE:number;
  idModeloOperacionTradicional:number;
  idModeloOperacionEmergencia:number;
}


export class DetalleSedes implements DetalleSedesModel{
  municipio: string;
  institucionEducativa: string;
  sede: string;
  matriculaSIMAT: number;
  porEstudiantesSISBEN?: number;
  priorizadaPAE?: boolean;
  modeloOperacionTradicional: string;
  modeloOperacionEmergencia: string;
  idMunicipio: number;
  idInstitucionEducativa: number;
  idSede: number;
  idPriorizadaPAE: number;
  idModeloOperacionTradicional: number;
  idModeloOperacionEmergencia: number;

}
