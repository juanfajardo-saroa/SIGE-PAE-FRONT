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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosPlanAlistamientoGetAll
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
export interface PA_ContratosPlanAlistamientoGetAllInterface {

        ContratoId:number;
    NumeroContrato:string;
    NombreRazonSocial:string;
    ModeloOperacion:string;
    FechalnicioContrato:Date;
    ID_EstadoBodegas:number;
    ID_EstadoMenus:number;
    ID_EstadoRutas:number;
    ID_EstadoDocumentacion:number;
    ID_TipoEstadoAlistamiento:number;
    PlazoRestante:number;
    EstadoBodegas:string;
    EstadoMenus:string;
    EstadoRutas:string;
    EstadoDocumentacion:string;
    TipoEstadoAlistamiento:string;
    ID_PlanAlistamiento:number;
    TMO1_Jornada:number;
    TMO2_Jornada:number;
    TMO3_Jornada:number;

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
export class PA_ContratosPlanAlistamientoGetAllModel implements PA_ContratosPlanAlistamientoGetAllInterface {
    constructor(
  
        public ContratoId:number, 
    public NumeroContrato:string, 
    public NombreRazonSocial:string, 
    public ModeloOperacion:string, 
    public FechalnicioContrato:Date, 
    public ID_EstadoBodegas:number, 
    public ID_EstadoMenus:number, 
    public ID_EstadoRutas:number, 
    public ID_EstadoDocumentacion:number, 
    public ID_TipoEstadoAlistamiento:number, 
    public PlazoRestante:number, 
    public EstadoBodegas:string, 
    public EstadoMenus:string, 
    public EstadoRutas:string, 
    public EstadoDocumentacion:string, 
    public TipoEstadoAlistamiento:string, 
    public ID_PlanAlistamiento:number, 
    public TMO1_Jornada:number, 
    public TMO2_Jornada:number, 
    public TMO3_Jornada:number, 

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
  





