/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Aprobaciones
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface AprobacionesInterface {

  id: number; 
  sID: string;
  iD_ETC: number;
  sID_ETC: string;
  iD_User:string;
  sID_User: string;
  iD_AccionAprobacion: number;
  sID_AccionAprobacion: string;
  id_Secciones: number;
  sId_Secciones: string;
  documentoParaAprobar: string;
  fechaAprobacion: Date;
  fecha: Date;
  accion: string;
  observaciones: string;
  id_Ubicacion: number;
  sId_Ubicacion: string;
  ubicacionOrigen: string;
  auditoria: string;
  filtro: string;
  id_Rol:number;
  sID_rol:string;
  plazoPorAprobar:Date;
  // atributos para gestión de auditoria del objeto
  _ippublica: string;
  _nombremaquina: string ;
  _usuario: string ;
  _ipdetrasproxy: string ;
  _browser: string ;
  _accion: string ;
  _sessionid: string ;
  _XMLAuditoria: string ;
  // atributos adicionales genericos para gestión del objeto
  isValid:boolean;
  isSelected:boolean;
  completed:boolean;

}

//Modelo constructor que implementa interface
export class AprobacionesModel implements AprobacionesInterface {
  constructor(

    public id: number,
   public sID: string,
   public iD_ETC: number,
   public sID_ETC: string,
   public iD_User:string,
   public sID_User: string,
   public iD_AccionAprobacion: number,
   public sID_AccionAprobacion: string,
   public id_Secciones: number,
   public sId_Secciones: string,
   public documentoParaAprobar: string,
   public fechaAprobacion: Date,
   public fecha: Date,
   public accion: string,
   public observaciones: string,
   public id_Ubicacion: number,
   public sId_Ubicacion: string,
   public ubicacionOrigen: string,
   public auditoria: string,
   public filtro: string,
   public id_Rol:number,
   public sID_rol:string,
   public plazoPorAprobar:Date,

  // atributos para gestión de auditoria del objeto
  public _ippublica: string,
  public _nombremaquina: string,
  public _usuario: string,
  public _ipdetrasproxy: string,
  public _browser: string,
  public _accion: string,
  public _sessionid: string,
  public  _XMLAuditoria: string ,
  // atributos adicionales genericos para gestión del objeto
  public  isValid: boolean=true,
  public isSelected: boolean = false,
  public completed: boolean = false


  ) { }
}






