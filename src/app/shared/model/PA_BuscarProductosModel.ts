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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_BuscarProductos
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
export interface PA_BuscarProductosInterface {

        ID_Producto:number;
    Producto:string;
    ID_GrupoAlimentos:number;
    GrupoAlimentos:string;
    ID_SubGrupoAlimentos:number;
    SubGrupoAlimentos:number;
    FechaRegistroProducto:Date;
    ID_EstadoRegistro:number;
    EstadoRegistro:string;
    ID_TipoProducto:number;
    TipoProducto:string;
    ColorEstado:string;

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
export class PA_BuscarProductosModel implements PA_BuscarProductosInterface {
    constructor(
  
        public ID_Producto:number, 
    public Producto:string, 
    public ID_GrupoAlimentos:number, 
    public GrupoAlimentos:string, 
    public ID_SubGrupoAlimentos:number, 
    public SubGrupoAlimentos:number, 
    public FechaRegistroProducto:Date, 
    public ID_EstadoRegistro:number, 
    public EstadoRegistro:string, 
    public ID_TipoProducto:number, 
    public TipoProducto:string, 
    public ColorEstado:string, 

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
  





