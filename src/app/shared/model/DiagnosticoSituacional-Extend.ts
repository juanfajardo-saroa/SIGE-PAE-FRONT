
/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>


//Modelo constructor que implementa interface
import { DiagnosticoSituacionalModel } from 'src/app/shared/model/DiagnosticoSituacional';

export interface  DiagnosticoSituacionalExtendInterface {
  sID:number, 
  filtro: string, 
  validationErrors:string, 
  extension:string
}

export class DiagnosticoSituacionalExtendModel extends DiagnosticoSituacionalModel  implements  DiagnosticoSituacionalExtendInterface {
    public extension:string;
    public sID:number;
    public filtro: string;
    public validationErrors:string;
  }
  





