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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ActaInicioGetAllWithRelation
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
export interface PA_ActaInicioGetAllWithRelationInterface {

        id:number;
    ID_PlanesAlistamiento:number;
    ID_CiclosMenu:number;
    FechaActa:Date;
    NombreSupervisor:string;
    CedulaSupervisor:string;
    LugarCedulaSupervisor:string;
    NombreRepresentanteLegalOperador:string;
    CedulaRepresentanteOperador:string;
    LugarCedulaRepresentante:string;
    FechaInicioOPeracionAutorizada:Date;
    EstadoInicioOperacion:string;
    Menu1:number;
    Menu2:number;
    Menu3:number;

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
export class PA_ActaInicioGetAllWithRelationModel implements PA_ActaInicioGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_PlanesAlistamiento:number, 
    public ID_CiclosMenu:number, 
    public FechaActa:Date, 
    public NombreSupervisor:string, 
    public CedulaSupervisor:string, 
    public LugarCedulaSupervisor:string, 
    public NombreRepresentanteLegalOperador:string, 
    public CedulaRepresentanteOperador:string, 
    public LugarCedulaRepresentante:string, 
    public FechaInicioOPeracionAutorizada:Date, 
    public EstadoInicioOperacion:string, 
    public Menu1:number, 
    public Menu2:number, 
    public Menu3:number, 

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
  





