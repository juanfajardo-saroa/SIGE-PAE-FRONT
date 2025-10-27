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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad ConfiguracionVistas
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
export interface ConfiguracionVistasInterface {

        id:number;
    nombre:string;
    tipoContratoId:number;
    subTipoContratoId:number;
    seccion1:boolean;
    seccion2:boolean;
    seccion3:boolean;
    seccion4:boolean;
    seccion5:boolean;
    seccion6:boolean;
    seccion7:boolean;
    seccion8:boolean;
    seccion9:boolean;
    seccion10:boolean;
    seccion11:boolean;
    seccion12:boolean;
    seccion13:boolean;
    seccion14:boolean;
    seccion15:boolean;
    seccion16:boolean;
    numSec1:number;
    numSec2:number;
    numSec3:number;
    numSec4:number;
    numSec5:number;
    numSec6:number;
    numSec7:number;
    numSec8:number;
    numSec9:number;
    numSec10:number;
    numSec11:number;
    numSec12:number;
    numSec13:number;
    numSec14:number;
    numSec15:number;
    numSec16:number;

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
export class ConfiguracionVistasModel implements ConfiguracionVistasInterface {
    constructor(
  
        public id:number, 
    public nombre:string, 
    public tipoContratoId:number, 
    public subTipoContratoId:number, 
    public seccion1:boolean, 
    public seccion2:boolean, 
    public seccion3:boolean, 
    public seccion4:boolean, 
    public seccion5:boolean, 
    public seccion6:boolean, 
    public seccion7:boolean, 
    public seccion8:boolean, 
    public seccion9:boolean, 
    public seccion10:boolean, 
    public seccion11:boolean, 
    public seccion12:boolean, 
    public seccion13:boolean, 
    public seccion14:boolean, 
    public seccion15:boolean, 
    public seccion16:boolean, 
    public numSec1:number, 
    public numSec2:number, 
    public numSec3:number, 
    public numSec4:number, 
    public numSec5:number, 
    public numSec6:number, 
    public numSec7:number, 
    public numSec8:number, 
    public numSec9:number, 
    public numSec10:number, 
    public numSec11:number, 
    public numSec12:number, 
    public numSec13:number, 
    public numSec14:number, 
    public numSec15:number, 
    public numSec16:number, 

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
  





