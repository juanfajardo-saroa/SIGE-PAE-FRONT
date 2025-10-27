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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_AlimentosICBFGetAllWithRelation
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
export interface PA_AlimentosICBFGetAllWithRelationInterface {

        id:number;
    ID_SubGrupoAlimentos:number;
    ID_TipoAlimento:number;
    ID_ETC:number;
    ID_TipoFuenteNutricional:number;
    CodigoICBF:string;
    PathlmagenAlimento:string;
    PathImagenInformacionNutricional:string;
    PorcentajeComestible:string;
    IntercambioEstandarizado:string;
    PesoBruto:string;
    Nombre:string;
    ID_TiposUnidad:number;
    ID_EstadoRegistro:number;
    FechaRegistro:Date;
    sID_EstadoRegistro:string;
    sID_ETC:string;
    sID_SubGrupoAlimentos:string;
    sID_TipoFuenteNutricional:string;
    sID_TipoAlimento:string;
    sID_TiposUnidad:string;

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
export class PA_AlimentosICBFGetAllWithRelationModel implements PA_AlimentosICBFGetAllWithRelationInterface {
    constructor(
  
        public id:number, 
    public ID_SubGrupoAlimentos:number, 
    public ID_TipoAlimento:number, 
    public ID_ETC:number, 
    public ID_TipoFuenteNutricional:number, 
    public CodigoICBF:string, 
    public PathlmagenAlimento:string, 
    public PathImagenInformacionNutricional:string, 
    public PorcentajeComestible:string, 
    public IntercambioEstandarizado:string, 
    public PesoBruto:string, 
    public Nombre:string, 
    public ID_TiposUnidad:number, 
    public ID_EstadoRegistro:number, 
    public FechaRegistro:Date, 
    public sID_EstadoRegistro:string, 
    public sID_ETC:string, 
    public sID_SubGrupoAlimentos:string, 
    public sID_TipoFuenteNutricional:string, 
    public sID_TipoAlimento:string, 
    public sID_TiposUnidad:string, 

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
  





