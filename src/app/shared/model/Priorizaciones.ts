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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Priorizaciones
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
export interface PriorizacionesInterface {

        id:number;
    iD_GradoSedeJornada:number;
    siD_GradoSedeJornada:  string ; 
    iD_TipoModalidadComplemento:number;
    siD_TipoModalidadComplemento:  string ; 
    iD_TipoModeloOperacion:number;
    siD_TipoModeloOperacion:  string ; 
    iD_TipoComplemento:number;
    siD_TipoComplemento:  string ; 
    iD_TipoEstadoPriorizacion:number;
    siD_TipoEstadoPriorizacion:  string ; 
    numeroComplementos:number;
    auditoria:string;
    iD_Vigencia:number;

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
export class PriorizacionesModel implements PriorizacionesInterface {
    constructor(
  
        public id:number, 
    public iD_GradoSedeJornada:number, 
    public siD_GradoSedeJornada: string , 
    public iD_TipoModalidadComplemento:number, 
    public siD_TipoModalidadComplemento: string , 
    public iD_TipoModeloOperacion:number, 
    public siD_TipoModeloOperacion: string , 
    public iD_TipoComplemento:number, 
    public siD_TipoComplemento: string , 
    public iD_TipoEstadoPriorizacion:number, 
    public siD_TipoEstadoPriorizacion: string , 
    public numeroComplementos:number, 
    public  iD_Vigencia:number,
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
  





