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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Diligenciamientos
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
export interface DiligenciamientosInterface {

        id:number;
    iD_TipoDiligenciamiento:number;
    iD_Cuestionario:number;
    siD_Cuestionario:  string ; 
    iD_VisitaControlSocial:number;
    siD_VisitaControlSocial:  string ; 
    iD_Visita:number;
    siD_Visita:  string ; 
    iD_EstadoDiligenciamiento:number;
    siD_EstadoDiligenciamiento:  string ; 
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
export class DiligenciamientosModel implements DiligenciamientosInterface {
    constructor(
  
        public id:number, 
    public iD_TipoDiligenciamiento:number, 
    public iD_Cuestionario:number, 
    public siD_Cuestionario: string , 
    public iD_VisitaControlSocial:number, 
    public siD_VisitaControlSocial: string , 
    public iD_Visita:number, 
    public siD_Visita: string , 
    public iD_EstadoDiligenciamiento:number, 
    public siD_EstadoDiligenciamiento: string , 
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
  





