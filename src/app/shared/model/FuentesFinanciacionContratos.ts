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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad FuentesFinanciacionContratos
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
export interface FuentesFinanciacionContratosInterface {

        id:number;
    iD_Contrato:number;
    siD_Contrato:  string ; 
    iD_FuenteFinanciacion:number;
    siD_FuenteFinanciacion:  string ; 
    iD_FuenteIngresos:number;
    siD_FuenteIngresos:  string ; 
    valor:number;
    auditoria:string;
    id_Modificacion:number;

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
export class FuentesFinanciacionContratosModel implements FuentesFinanciacionContratosInterface {
    constructor(
  
        public id:number, 
    public iD_Contrato:number, 
    public siD_Contrato: string , 
    public iD_FuenteFinanciacion:number, 
    public siD_FuenteFinanciacion: string , 
    public iD_FuenteIngresos:number, 
    public siD_FuenteIngresos: string , 
    public valor:number, 
    public auditoria:string, 
    public id_Modificacion:number, 

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
  





