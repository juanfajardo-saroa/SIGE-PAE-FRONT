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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad MinutaPatronAlimentosF3
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
export interface MinutaPatronAlimentosF3Interface {

        id:number;
    nombre:string;
    iD_TipoMinutaPatron:number;
    iD_TipoEstadoMinuta:number;
    iD_TipoModeloOperacion:number;
    iD_ETC:number;
    auditoria:string;
    modalidadComplementoId:number;
    tipoComplementoId:number;
    tipoNivelEducativoId:number;
    tipoActividadFisicaId:number;
    recomendaciones:string;
    justificacion:string;
    adjuntoJustificacionPATH:string;
    rechazado:boolean;
    id_Vigencia:number;
    iD_MinutaAprobacion:number;

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
export class MinutaPatronAlimentosF3Model implements MinutaPatronAlimentosF3Interface {
    constructor(
  
        public id:number, 
    public nombre:string, 
    public iD_TipoMinutaPatron:number, 
    public iD_TipoEstadoMinuta:number, 
    public iD_TipoModeloOperacion:number, 
    public iD_ETC:number, 
    public auditoria:string, 
    public modalidadComplementoId:number, 
    public tipoComplementoId:number, 
    public tipoNivelEducativoId:number, 
    public tipoActividadFisicaId:number, 
    public recomendaciones:string, 
    public justificacion:string, 
    public adjuntoJustificacionPATH:string, 
    public rechazado:boolean, 
    public id_Vigencia:number, 
    public iD_MinutaAprobacion:number, 

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
  





