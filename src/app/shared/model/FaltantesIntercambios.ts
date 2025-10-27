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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad FaltantesIntercambios
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
export interface FaltantesIntercambiosInterface {

        id:number;
    iD_ProductoIntercambio:number;
    siD_ProductoIntercambio:  string ; 
    iD_EntregaViveres:number;
    siD_EntregaViveres:  string ; 
    cantidadRecibida:number;
    cantidadNoCoincidePor:string;
    cantidadFaltante:number;
    cantidadDevuelta:number;
    fechaEntregaFaltante:Date;
    buenEstado:boolean;
    buenEmpacado:boolean;
    sinContaminacion:boolean;
    sinExpirar:boolean;
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
export class FaltantesIntercambiosModel implements FaltantesIntercambiosInterface {
    constructor(
  
        public id:number, 
    public iD_ProductoIntercambio:number, 
    public siD_ProductoIntercambio: string , 
    public iD_EntregaViveres:number, 
    public siD_EntregaViveres: string , 
    public cantidadRecibida:number, 
    public cantidadNoCoincidePor:string, 
    public cantidadFaltante:number, 
    public cantidadDevuelta:number, 
    public fechaEntregaFaltante:Date, 
    public buenEstado:boolean, 
    public buenEmpacado:boolean, 
    public sinContaminacion:boolean, 
    public sinExpirar:boolean, 
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
  





