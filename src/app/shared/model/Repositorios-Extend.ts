/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>
import { RepositoriosModel } from "./Repositorios";

//Modelo constructor que implementa interface

export interface RepositoriosExtendInterface {
  sID: number,
  filtro: string,
  validationErrors: string,
  extension: string,
  imagen: string,
  publicacion: number,
  anexos:{},
  pahtArchivo2:any,
 
}

export class RepositoriosExtendModel extends RepositoriosModel implements RepositoriosExtendInterface {
  public extension: string;
  public sID: number;
  public filtro: string;
  public validationErrors: string;
  public imagen: string;
  public publicacion: number;
  public   anexos:{};
 public pahtArchivo2: any;
 
}






