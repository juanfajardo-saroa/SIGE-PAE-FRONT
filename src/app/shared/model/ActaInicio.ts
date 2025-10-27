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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad ActaInicio
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
export interface ActaInicioInterface {

  id: number;
  sID: string;
  ID_PlanAlistamiento: number;
  sID_PlanAlistamiento: string;
  ID_Contrato: number;
  sID_Contrato: string;
  ID_CicloMenu: number;
  sID_CicloMenu: string;
  FechaActa: Date;
  NombreSupervisor: string;
  CedulaSupervisor: string;
  LugarCedulaSupervisor: string;
  NombreRepresentanteLegalOperador: string;
  CedulaRepresentanteOperador: string;
  LugarCedulaRepresentante: string;
  FechaInicioOPeracionAutorizada: Date;
  EstadoInicioOperacion: boolean;
  Menu1: number;
  Menu2: number;
  Menu3: number;
  Estado: boolean;
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

/**
 * Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
 *
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
 */
export class ActaInicioModel implements ActaInicioInterface {
  constructor(
    public id: number,
    public sID: string,
    public ID_PlanAlistamiento: number,
    public sID_PlanAlistamiento: string,
    public ID_Contrato: number,
    public sID_Contrato: string,
    public ID_CicloMenu: number,
    public sID_CicloMenu: string,
    public FechaActa: Date,
    public NombreSupervisor: string,
    public CedulaSupervisor: string,
    public LugarCedulaSupervisor: string,
    public NombreRepresentanteLegalOperador: string,
    public CedulaRepresentanteOperador: string,
    public LugarCedulaRepresentante: string,
    public FechaInicioOPeracionAutorizada: Date,
    public EstadoInicioOperacion: boolean,
    public Menu1: number,
    public Menu2: number,
    public Menu3: number,
    public Estado: boolean,
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






