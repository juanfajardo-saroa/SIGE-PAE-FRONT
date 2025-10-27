/**
 * <Derechos_Reservados>
 * 
 * Aplicacion		:SISPAE 
 * 
 * Autor			:TiGlobal SAS y SoftManagement
 * 
 * Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
 * 
 * Ano			    :2022
 * 
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PlanesAlistamientos
 * 
 * Capa			    :SISPAE-Front 
 * 
 * </Derechos_Reservados>
 */


/**
 * Definicion de Interface  con los atributos del objeto, desprovistas de inicialización y funcionalidad,
 *
 *  La interfaz es el contrato entre el mundo exterior y la clase
 */
export interface PlanesAlistamientosInterface {

  iD: number;
  iD_EstadoBodegas: number;
  iD_EstadoDocumentacion: number;
  iD_EstadoMenus: number;
  siD_EstadoMenus: string;
  iD_EstadoRutas: number;
  iD_EstadoActaInicio: number;
  siD_EstadoActaInicio: string;
  iD_TipoEstadoAlistamiento: number;
  siD_TipoEstadoAlistamiento: string;
  auditoria: string;
  rutasporModeloOperacion: boolean;
  id_contrato: number;

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

/**
 * Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
 *
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
 */
export class PlanesAlistamientosModel implements PlanesAlistamientosInterface {
  constructor(

    public iD: number,
    public iD_EstadoBodegas: number,
    public iD_EstadoDocumentacion: number,
    public iD_EstadoMenus: number,
    public siD_EstadoMenus: string,
    public iD_EstadoRutas: number,
    public iD_EstadoActaInicio: number,
    public siD_EstadoActaInicio: string,
    public iD_TipoEstadoAlistamiento: number,
    public siD_TipoEstadoAlistamiento: string,
    public auditoria: string,
    public rutasporModeloOperacion: boolean,
    public id_contrato: number,

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






