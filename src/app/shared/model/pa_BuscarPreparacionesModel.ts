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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad pa_BuscarPreparaciones
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
export interface pa_BuscarPreparacionesInterface {

        ID_Preparacion:number;
    NombrePreparacion:string;
    ID_GrupoAlimentos:number;
    ID_SubGrupoAlimentos:number;
    FechaPreparacion:Date;
    Estado:number;
    ColorEstadoPreparacion:string;
    EstadoPreparacion:string;
    ID_TipoPreparacion:number;
    TipoPreparacion:string;
    ID_ModeloOperacion:number;
    ModeloOperacion:string;
    ComplementosAplica:string;
    ID_ETC:number;

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
export class pa_BuscarPreparacionesModel implements pa_BuscarPreparacionesInterface {
    constructor(
  
        public ID_Preparacion:number, 
    public NombrePreparacion:string, 
    public ID_GrupoAlimentos:number, 
    public ID_SubGrupoAlimentos:number, 
    public FechaPreparacion:Date, 
    public Estado:number, 
    public ColorEstadoPreparacion:string, 
    public EstadoPreparacion:string, 
    public ID_TipoPreparacion:number, 
    public TipoPreparacion:string, 
    public ID_ModeloOperacion:number, 
    public ModeloOperacion:string, 
    public ComplementosAplica:string, 
    public ID_ETC:number, 

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
  





