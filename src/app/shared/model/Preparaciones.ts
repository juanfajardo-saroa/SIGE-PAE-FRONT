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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Preparaciones
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
export interface PreparacionesInterface {

  sID: string;
  id:number;
  iD_TipoModeloOperacion: number;
  sID_TipoModeloOperacion: string;
  iD_MinutaPatron: number;
  sID_MinutaPatron:string;
  iD_ETC:number;
  sID_ETC:string;
  nombre:string;
  preparacionMixta:boolean;
  preparacionBebida:boolean;
  guiaPreparacion:string;
  fechaPreparacion:Date;
  pathGuia: string;
  iD_TipoEstado:number;
  sID_TipoEstado: string;
  auditoria:string;

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

/**
 * Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
 *
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
 */
export class PreparacionesModel implements PreparacionesInterface {
    constructor(
  
      public sID: string,
      public id:number,
      public iD_TipoModeloOperacion: number,
      public sID_TipoModeloOperacion: string,
      public iD_MinutaPatron: number,
      public sID_MinutaPatron:string,
      public iD_ETC:number,
      public sID_ETC:string,
      public nombre:string,
      public preparacionMixta:boolean,
     public  preparacionBebida:boolean,
     public guiaPreparacion:string,
      public fechaPreparacion:Date,
      public pathGuia: string,
      public iD_TipoEstado:number,
      public sID_TipoEstado: string,
    public auditoria:string, 

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
  
    ){}
  }
  





