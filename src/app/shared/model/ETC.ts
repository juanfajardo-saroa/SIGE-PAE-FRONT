/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad ETC
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface ETCInterface {

  id: number;
  iD_TipoETC: number;
  siD_TipoETC: string;
  codigo: string;
  nombre: string;
  iD_DiagnosticoSituacional: number;
  siD_DiagnosticoSituacional: string;
  auditoria: string;

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
export class ETCModel implements ETCInterface {
  constructor(

    public id: number,
    public iD_TipoETC: number,
    public siD_TipoETC: string,
    public codigo: string,
    public nombre: string,
    public iD_DiagnosticoSituacional: number,
    public siD_DiagnosticoSituacional: string,
    public auditoria: string,

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




