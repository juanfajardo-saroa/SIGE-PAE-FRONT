/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad EntregasRaciones
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

import { EntregasComplementosModel } from "./EntregasComplementosModel";

//Interface
export interface EntregasRacionesExtendInterface {
      
      nombreTipoReporte:string,  
      iD_justificacion:number,
      siD_justificacion:string,
      iD_Color:number,
      siD_Color:string,
      select:boolean,

  }

//Modelo constructor que implementa interface
export class EntregasRacionesExtendModel extends EntregasComplementosModel implements EntregasRacionesExtendInterface {
    public nombreTipoReporte: string;
    public iD_justificacion:number;
    public siD_justificacion:string;
    public iD_Color:number;
    public siD_Color:string;
    public select:boolean;
  }
  





