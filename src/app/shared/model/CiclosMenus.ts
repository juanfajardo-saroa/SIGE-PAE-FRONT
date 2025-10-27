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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad CiclosMenus
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
 export interface CiclosMenusInterface {

  id:number;
iD_ETC:number;
siD_ETC:  string ;
iD_TipoModeloOperacion:number;
siD_TipoModeloOperacion:  string ;
iD_TipoComplemento:number;
siD_TipoComplemento:  string ;
iD_TipoModalidadComplemento:number;
siD_TipoModalidadComplemento:  string ;
iD_MinutaAprobacion:number;
sID_MinutaAprobacion:  string ;
iD_CiclosMenuReferencia:number;
iD_TipoNivelEducativo:number;
iD_Zona:number;
siD_Zona:  string ;
iD_EstadoRegistro:number;
siD_EstadoRegistro:  string ;
nombre:string;
menuReferencia:boolean;
menusParaTodosNiveles:boolean;
menusParaTodasZonas:boolean;
cantidadMenus:number;
auditoria:string;
id_menuReferencia:number;
id_menusParaTodosNiveles:number;
id_menusParaTodasZonas:number;
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
validationErrors:string;
}

/**
* Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
*
* En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
*/
export class CiclosMenusModel implements CiclosMenusInterface {
constructor(

  public id:number,
public iD_ETC:number,
public siD_ETC: string ,
public iD_TipoModeloOperacion:number,
public siD_TipoModeloOperacion: string ,
public iD_TipoComplemento:number,
public siD_TipoComplemento: string ,
public iD_TipoModalidadComplemento:number,
public siD_TipoModalidadComplemento: string ,
public iD_MinutaAprobacion:number,
public sID_MinutaAprobacion: string ,
public iD_CiclosMenuReferencia:number,
public iD_TipoNivelEducativo:number,
public iD_Zona:number,
public siD_Zona: string ,
public iD_EstadoRegistro:number,
public siD_EstadoRegistro: string ,
public nombre:string,
public menuReferencia:boolean,
public menusParaTodosNiveles:boolean,
public menusParaTodasZonas:boolean,
public cantidadMenus:number,
public auditoria:string,
public id_menuReferencia:number,
public id_menusParaTodosNiveles:number,
public id_menusParaTodasZonas:number,

// atributos para gestión de auditoria del objeto
public _ippublica: string,
public _nombremaquina: string,
public _usuario: string,
public _ipdetrasproxy: string,
public _browser: string,
public _accion: string,
public _sessionid: string,
public  _XMLAuditoria: string ,
public validationErrors:string,
// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}






