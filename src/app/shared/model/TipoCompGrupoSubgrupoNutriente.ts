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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad TipoCompGrupoSubgrupoNutriente
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
export interface TipoCompGrupoSubgrupoNutrienteInterface {

        id:number;
    iD_TipoModeloOperacion:number;
    siD_TipoModeloOperacion:  string ; 
    iD_Nutriente:number;
    siD_Nutriente:  string ; 
    iD_TipoComplemento:number;
    siD_TipoComplemento:  string ; 
    iD_ModalidadComplemento:number;
    siD_ModalidadComplemento:  string ; 
    iD_TipoSentidoValidacion:number;
    siD_TipoSentidoValidacion:  string ; 
    minVisible:boolean;
    maxVisible:boolean;
    unidadMedida:string;
    textoMsg:string;
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
export class TipoCompGrupoSubgrupoNutrienteModel implements TipoCompGrupoSubgrupoNutrienteInterface {
    constructor(
  
        public id:number, 
    public iD_TipoModeloOperacion:number, 
    public siD_TipoModeloOperacion: string , 
    public iD_Nutriente:number, 
    public siD_Nutriente: string , 
    public iD_TipoComplemento:number, 
    public siD_TipoComplemento: string , 
    public iD_ModalidadComplemento:number, 
    public siD_ModalidadComplemento: string , 
    public iD_TipoSentidoValidacion:number, 
    public siD_TipoSentidoValidacion: string , 
    public minVisible:boolean, 
    public maxVisible:boolean, 
    public unidadMedida:string, 
    public textoMsg:string, 
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
  





