/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Sedes
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface SedesInterface {

  id: number;
  iD_lE: number;
  siD_lE: string;
  iD_Zona: number;
  siD_Zona: string;
  iD_GrupoAnalisis: number;
  siD_GrupoAnalisis: string;
  iD_ETC: number;
  siD_ETC: string;
  iD_Divipola: number;
  siD_Divipola: string;
  codigoDane: string;
  nombre: string;
  direccion: string;
  telefono: string;
  etnico: boolean;
  priorizacionPAE: boolean;
  auditoria: string;
  filtro: string;
  iD_TipoAcceso: number;

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
export class SedesModel implements SedesInterface {
  constructor(

    public id: number,
    public iD_lE: number,
    public siD_lE: string,
    public iD_Zona: number,
    public siD_Zona: string,
    public iD_GrupoAnalisis: number,
    public siD_GrupoAnalisis: string,
    public iD_ETC: number,
    public siD_ETC: string,
    public iD_Divipola: number,
    public siD_Divipola: string,
    public codigoDane: string,
    public nombre: string,
    public direccion: string,
    public telefono: string,
    public etnico: boolean,
    public priorizacionPAE: boolean,
    public auditoria: string,
    public filtro: string,
    public iD_TipoAcceso: number,

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
