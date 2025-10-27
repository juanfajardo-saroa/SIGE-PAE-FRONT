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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad CompraLocales
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
export interface CompraLocalesInterface {

        id:number;
    iD_Proveedor:number;
    siD_Proveedor:  string ; 
    iD_Operador:number;
    siD_Operador:  string ; 
    iD_Contrato:number;
    siD_Contrato:  string ; 
    iD_AgrupacionMensual:number;
    siD_AgrupacionMensual:  string ; 
    totalKg:number;
    totalProductos:number;
    valorFactura:number;
    facturaPDFPATH:number;
    cumpleCriterio:number;
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
export class CompraLocalesModel implements CompraLocalesInterface {
    constructor(
  
        public id:number, 
    public iD_Proveedor:number, 
    public siD_Proveedor: string , 
    public iD_Operador:number, 
    public siD_Operador: string , 
    public iD_Contrato:number, 
    public siD_Contrato: string , 
    public iD_AgrupacionMensual:number, 
    public siD_AgrupacionMensual: string , 
    public totalKg:number, 
    public totalProductos:number, 
    public valorFactura:number, 
    public facturaPDFPATH:number, 
    public cumpleCriterio:number, 
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
  





