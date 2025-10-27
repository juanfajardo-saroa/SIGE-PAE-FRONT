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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MinutaPatronAlimentosLeve
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
export interface MinutaPatronAlimentosLeveInterface {

        id:number;
    iD_ETC:number;
    siD_ETC:  string ; 
    iD_TipoModeloOperacion:number;
    siD_TipoModeloOperacion:  string ; 
    iD_TipoEstadoMinuta:number;
    siD_TipoEstadoMinuta:  string ; 
    tipoActividadFisicaId:number;
    stipoActividadFisicaId:  string ; 
    justificacion:string;
    adjuntoJustificacionPATH:string;
    rechazado:boolean;
    auditoria:string;
    fechaSolicitud:Date;

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
export class MinutaPatronAlimentosLeveModel implements MinutaPatronAlimentosLeveInterface {
    constructor(
  
        public id:number, 
    public iD_ETC:number, 
    public siD_ETC: string , 
    public iD_TipoModeloOperacion:number, 
    public siD_TipoModeloOperacion: string , 
    public iD_TipoEstadoMinuta:number, 
    public siD_TipoEstadoMinuta: string , 
    public tipoActividadFisicaId:number, 
    public stipoActividadFisicaId: string , 
    public justificacion:string, 
    public adjuntoJustificacionPATH:string, 
    public rechazado:boolean, 
    public auditoria:string, 
    public fechaSolicitud:Date, 

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
  





