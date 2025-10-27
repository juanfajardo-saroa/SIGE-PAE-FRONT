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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad EncabezadoMatricula
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
export interface EncabezadoMatriculaInterface {

        iD:number;
    iD_ETC:number;
    siD_ETC:  string ; 
    iD_TipoProcesoCarga:number;
    siD_TipoProcesoCarga:  string ; 
    iD_EstadoCargue:number;
    siD_EstadoCargue:  string ; 
    fecha:Date;
    agno:number;
    mes:number;
    nombreArchivo:string;
    totalRegistros:number;
    totalRegistroOK:number;
    totalResgistroError:number;
    matriculaSectorOficial:boolean;
    auditoria:string;
    json:string;

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
export class EncabezadoMatriculaModel implements EncabezadoMatriculaInterface {
    constructor(
  
        public iD:number, 
    public iD_ETC:number, 
    public siD_ETC: string , 
    public iD_TipoProcesoCarga:number, 
    public siD_TipoProcesoCarga: string , 
    public iD_EstadoCargue:number, 
    public siD_EstadoCargue: string , 
    public fecha:Date, 
    public agno:number, 
    public mes:number, 
    public nombreArchivo:string, 
    public totalRegistros:number, 
    public totalRegistroOK:number, 
    public totalResgistroError:number, 
    public matriculaSectorOficial:boolean, 
    public auditoria:string, 
    public json:string, 

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
  





