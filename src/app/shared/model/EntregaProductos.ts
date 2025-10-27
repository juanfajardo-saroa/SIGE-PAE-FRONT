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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad EntregaProductos
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
export interface EntregaProductosInterface {

        id:number;
    iD_Ruta:number;
    siD_Ruta:  string ; 
    iD_TipoPeriocidad:number;
    siD_TipoPeriocidad:  string ; 
    iD_TipoDiaSemanaEntrega1:number;
    siD_TipoDiaSemanaEntrega1:  string ; 
    iD_TipoDiaSemanaEntrega2:number;
    siD_TipoDiaSemanaEntrega2:  string ; 
    iD_TipoProductoRuta:number;
    siD_TipoProductoRuta:  string ; 
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
export class EntregaProductosModel implements EntregaProductosInterface {
    constructor(
  
        public id:number, 
    public iD_Ruta:number, 
    public siD_Ruta: string , 
    public iD_TipoPeriocidad:number, 
    public siD_TipoPeriocidad: string , 
    public iD_TipoDiaSemanaEntrega1:number, 
    public siD_TipoDiaSemanaEntrega1: string , 
    public iD_TipoDiaSemanaEntrega2:number, 
    public siD_TipoDiaSemanaEntrega2: string , 
    public iD_TipoProductoRuta:number, 
    public siD_TipoProductoRuta: string , 
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
  





