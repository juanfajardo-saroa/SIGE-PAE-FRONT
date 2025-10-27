/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad CaracterizacionInfraestructura
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
//type Nullable<T> = T | null;
export interface CaracterizacionInfraestructuraInterface {
  
  id: number;
  sID: string;
  iD_Sede: number;
  sID_Sede: string;
  iD_Inventario: number;
  sID_Inventario: string;
  fechaCaracterizacion: Date;
  fechaModificacion: Date;
  descripcion: string;
  chS_Fecha: Date;
  chS_Documento: any;
  rutaArchivo: string;
  auditoria: string;
  filtro: string;
  suficienciaDotacion:number;
  id_TipoEstadoCaracterizacion: number;
  id_TipoModalidadComplementoSugerida:number;
  // atributos para gestión de auditoria del objeto
  _ippublica: string;
  _nombremaquina: string;
  _usuario: string;
  _ipdetrasproxy: string;
  _browser: string;
  _accion: string;
  _sessionid: string;
  _XMLAuditoria: string;
  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class CaracterizacionInfraestructuraModel implements CaracterizacionInfraestructuraInterface {
  constructor(
   
    public id: number,
    public sID: string,
    public iD_Sede: number,
    public sID_Sede: string,
    public iD_Inventario: number,
    public sID_Inventario: string,
    public fechaCaracterizacion: Date,
    public fechaModificacion: Date,
    public descripcion: string,
    public chS_Fecha: Date,
    public chS_Documento: any,
    public rutaArchivo: string,
    public auditoria: string,
    public  filtro: string,
    public  suficienciaDotacion:number,
    public id_TipoEstadoCaracterizacion: number,
    public id_TipoModalidadComplementoSugerida:number,
    // atributos para gestión de auditoria del objeto
    public _ippublica: string,
    public _nombremaquina: string,
    public _usuario: string,
    public _ipdetrasproxy: string,
    public _browser: string,
    public _accion: string,
    public _sessionid: string,
    public _XMLAuditoria: string,
    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






