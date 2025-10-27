/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad ValorCaracteristicas
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface ValorCaracteristicasInterface {
  
  id: number;
  sID: string;
  iD_Caracterizacion: number;
  sID_Caracterizacion: string;
  iD_ValorEscala: number;
  sID_ValorEscala: string;
  auditoria: string;
  iD_Caracteristica: number;
  sID_Caracteristica: string;
  filtro: string;
  valor:number;
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
export class ValorCaracteristicasModel implements ValorCaracteristicasInterface {
  constructor(
    
    public id: number,
    public sID: string,
    public iD_Caracterizacion: number,
    public sID_Caracterizacion: string,
    public iD_ValorEscala: number,
    public sID_ValorEscala: string,
    public auditoria: string,
    public iD_Caracteristica: number,
    public sID_Caracteristica: string,
    public filtro: string,
    public valor:number,
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






