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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad ExcedentesComplementos
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
export interface ExcedentesComplementosInterface {

        id:number;
    iD_Comite:number;
    siD_Comite:  string ; 
    iD_GradoSedeJornada:number;
    siD_GradoSedeJornada:  string ; 
    iD_TipoDestinoComplemento:number;
    siD_TipoDestinoComplemento:  string ; 
    fechaReporte:Date;
    cantExcedentes:number;
    auditoria:string;
    justificacion:string;
    id_TipoEstadoExcedentesComplementos:number;
    sid_TipoEstadoExcedentesComplementos:  string ; 

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
export class ExcedentesComplementosModel implements ExcedentesComplementosInterface {
    constructor(
  
        public id:number, 
    public iD_Comite:number, 
    public siD_Comite: string , 
    public iD_GradoSedeJornada:number, 
    public siD_GradoSedeJornada: string , 
    public iD_TipoDestinoComplemento:number, 
    public siD_TipoDestinoComplemento: string , 
    public fechaReporte:Date, 
    public cantExcedentes:number, 
    public auditoria:string, 
    public justificacion:string, 
    public id_TipoEstadoExcedentesComplementos:number, 
    public sid_TipoEstadoExcedentesComplementos: string , 

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
  





