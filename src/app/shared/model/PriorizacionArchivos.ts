
/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

import { PriorizacionesModel } from "./Priorizaciones";




//Modelo constructor que implementa interface

export interface  PriorizacionArchivoExtendInterface {
  sID:number, 
  filtro: string, 
  validationErrors:string, 
  extension:string
}

export class PriorizacionArchivoExtendModel extends PriorizacionesModel  implements  PriorizacionArchivoExtendInterface {
    public extension:string;
    public sID:number;
    public filtro: string;
    public validationErrors:string;
  }