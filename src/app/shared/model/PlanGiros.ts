/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PlanGiros
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PlanGirosInterface {

  id: number;
  iD_ETC: number;
  siD_ETC: string;
  mes: string;
  giroProyectado: number;
  giroConfirmado: number;
  pathSoporteGiro: string;
  auditoria: string;
  sID: string;
  sID_ETC: string;
  sMes: string;
  idVigencia: number;
  sidVigencia: string;
  fechaTransferencia: Date;
  numeroOrden: string;
  filtro: string;

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
export class PlanGirosModel implements PlanGirosInterface {
  constructor(

    public id: number,
    public iD_ETC: number,
    public siD_ETC: string,
    public mes: string,
    public giroProyectado: number,
    public giroConfirmado: number,
    public pathSoporteGiro: string,
    public auditoria: string,
    public sID: string,
    public sID_ETC: string,
    public sMes: string,
    public idVigencia: number,
    public sidVigencia: string,
    public fechaTransferencia: Date,
    public numeroOrden: string,
    public filtro: string,
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





