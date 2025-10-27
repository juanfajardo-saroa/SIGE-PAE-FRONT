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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad TipoCompGrupoSubgrupoAli
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
export interface TipoCompGrupoSubgrupoAliInterface {

        id:number;
    iD_TipoModeloOperacion:number;
    siD_TipoModeloOperacion:  string ; 
    iD_TipoComponente:number;
    siD_TipoComponente:  string ; 
    iD_GrupoAlimento:number;
    siD_GrupoAlimento:  string ; 
    iD_SubGrupoAlimento:number;
    siD_SubGrupoAlimento:  string ; 
    auditoria:string;
    minVisible:boolean;
    maxVisible:boolean;
    subgrupoManejaValor:boolean;
    subgrupoFrecuencia:boolean;
    unidadMedida:string;
    iD_TipoComplemento:number;
    siD_TipoComplemento:  string ; 
    iD_ModalidadComplemento:number;
    siD_ModalidadComplemento:  string ; 
    textoMsg:string;
    iD_TipoSentidoValidacion:number;
    siD_TipoSentidoValidacion:  string ; 

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
export class TipoCompGrupoSubgrupoAliModel implements TipoCompGrupoSubgrupoAliInterface {
    constructor(
  
        public id:number, 
    public iD_TipoModeloOperacion:number, 
    public siD_TipoModeloOperacion: string , 
    public iD_TipoComponente:number, 
    public siD_TipoComponente: string , 
    public iD_GrupoAlimento:number, 
    public siD_GrupoAlimento: string , 
    public iD_SubGrupoAlimento:number, 
    public siD_SubGrupoAlimento: string , 
    public auditoria:string, 
    public minVisible:boolean, 
    public maxVisible:boolean, 
    public subgrupoManejaValor:boolean, 
    public subgrupoFrecuencia:boolean, 
    public unidadMedida:string, 
    public iD_TipoComplemento:number, 
    public siD_TipoComplemento: string , 
    public iD_ModalidadComplemento:number, 
    public siD_ModalidadComplemento: string , 
    public textoMsg:string, 
    public iD_TipoSentidoValidacion:number, 
    public siD_TipoSentidoValidacion: string , 

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
  





