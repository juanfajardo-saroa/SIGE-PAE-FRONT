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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad CompraLocalesContrato
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
export interface CompraLocalesContratoInterface {

        id:number;
    iD_contrato:number;
    siD_contrato:  string ; 
    iD_TipoReglaCompraLocal:number;
    siD_TipoReglaCompraLocal:  string ; 
    iD_TipoCriterioEvaluacion:number;
    siD_TipoCriterioEvaluacion:  string ; 
    iD_TipoPeriodicidad:number;
    siD_TipoPeriodicidad:  string ; 
    porcentajeMinimo:number;
    numeroEmpresasMinimo:number;
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
export class CompraLocalesContratoModel implements CompraLocalesContratoInterface {
    constructor(
  
        public id:number, 
    public iD_contrato:number, 
    public siD_contrato: string , 
    public iD_TipoReglaCompraLocal:number, 
    public siD_TipoReglaCompraLocal: string , 
    public iD_TipoCriterioEvaluacion:number, 
    public siD_TipoCriterioEvaluacion: string , 
    public iD_TipoPeriodicidad:number, 
    public siD_TipoPeriodicidad: string , 
    public porcentajeMinimo:number, 
    public numeroEmpresasMinimo:number, 
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
  





