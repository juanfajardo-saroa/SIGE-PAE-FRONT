/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad QuincenaEntregaRaciones
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

import { QuincenaEntregaRacionesModel } from "./QuincenaEntregaRaciones";

//Interface
export interface QuincenaEntregaRacionesExtendInterface {
   idContrato:number;
   numeroContrato:string;
   idDivipola:number;
   nombreDivipola:string;
   idInstitucionEducativa:number;
   nombreInstitucionEducativa:string;
   idSede:number;
   nombreSede:string;
   idJornada:number;
   nombreJornada:string;
   idEstadoQuincena:number;
   nombreEstadoQuincena:string;
  }

//Modelo constructor que implementa interface
export class QuincenaEntregaRacionesExtendModel extends QuincenaEntregaRacionesModel implements QuincenaEntregaRacionesExtendInterface {
      public idContrato:number;
      public numeroContrato:string;
      public idDivipola:number;
      public nombreDivipola:string;
      public idInstitucionEducativa:number;
      public nombreInstitucionEducativa:string;
      public idSede:number;
      public nombreSede:string;
      public idJornada:number;
      public nombreJornada:string;
      public idEstadoQuincena:number;
      public nombreEstadoQuincena:string;
}
  





