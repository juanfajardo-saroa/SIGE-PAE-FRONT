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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Contratos
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
export interface ContratosInterface {

        id:number;
    iD_TipoContratoCHIP:number;
    siD_TipoContratoCHIP:  string ; 
    iD_TipoConceptoGasto:number;
    siD_TipoConceptoGasto:  string ; 
    iD_ETC:number;
    siD_ETC:  string ; 
    iD_ET:number;
    siD_ET:  string ; 
    iD_MinutaPatronAlimento:number;
    siD_MinutaPatronAlimento:  string ; 
    iD_Operador:number;
    siD_Operador:  string ; 
    iD_TipoCategoriaContrato:number;
    siD_TipoCategoriaContrato:  string ; 
    iD_EstadoContrato:number;
    siD_EstadoContrato:  string ; 
    iD_UTConsorcio:number;
    siD_UTConsorcio:  string ; 
    iD_PlanAlistamiento:number;
    siD_PlanAlistamiento:  string ; 
    iD_Vigencia:number;
    siD_Vigencia:  string ; 
    numeroContrato:string;
    objetoContrato:string;
    conAnticipo:boolean;
    fechalnicioContrato:Date;
    fechaFinalContrato:Date;
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
export class ContratosModel implements ContratosInterface {
    constructor(
  
        public id:number, 
    public iD_TipoContratoCHIP:number, 
    public siD_TipoContratoCHIP: string , 
    public iD_TipoConceptoGasto:number, 
    public siD_TipoConceptoGasto: string , 
    public iD_ETC:number, 
    public siD_ETC: string , 
    public iD_ET:number, 
    public siD_ET: string , 
    public iD_MinutaPatronAlimento:number, 
    public siD_MinutaPatronAlimento: string , 
    public iD_Operador:number, 
    public siD_Operador: string , 
    public iD_TipoCategoriaContrato:number, 
    public siD_TipoCategoriaContrato: string , 
    public iD_EstadoContrato:number, 
    public siD_EstadoContrato: string , 
    public iD_UTConsorcio:number, 
    public siD_UTConsorcio: string , 
    public iD_PlanAlistamiento:number, 
    public siD_PlanAlistamiento: string , 
    public iD_Vigencia:number, 
    public siD_Vigencia: string , 
    public numeroContrato:string, 
    public objetoContrato:string, 
    public conAnticipo:boolean, 
    public fechalnicioContrato:Date, 
    public fechaFinalContrato:Date, 
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
  





