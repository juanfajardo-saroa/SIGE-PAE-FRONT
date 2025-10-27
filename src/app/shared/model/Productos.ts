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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad Productos
 * 
 * Capa			    :SISPAE-Front 
 * 
 * </Derechos_Reservados>
 */


/**
 * Definicion de Interface  con los atributos del objeto, desprovistas de inicialización y funcionalidad,ETCService
 *
 *  La interfaz es el contrato entre el mundo exterior y la clase
 */
export interface ProductosInterface {

  id: number,
  sID: string,
  iD_SubGrupoAlimentos: number,
  sID_SubGrupoAlimentos: string,
  iD_ETC: number,
  sID_ETC: string,
  iD_TiposAlimentos: number,
  sID_TiposAlimentos: string,
  iD_TiposUnidad: number,
  sID_TiposUnidad: string,
  iD_EstadoRegistro: number,
  sID_EstadoRegistro: string,
  iD_RegistroINVIMA: number,
  sID_RegistroINVIMA: string,
  numeroRegistroInvima: string,
  nombre: string,
  pathlmagenProducto: string,
  pathlmagenRegistroSanitario: string,
  baseFruta: boolean,
  auditoria: string,
  pathImagenInformacionNutricional: string,
  fechaRegistro: Date,
  filtro: string,

  // atributos para gestión de auditoria del objeto
  _ippublica: string,
  _nombremaquina: string,
  _usuario: string,
  _ipdetrasproxy: string,
  _browser: string,
  _accion: string,
  _sessionid: string,
  _XMLAuditoria: string,
  
  // atributos adicionales genericos para gestión del objeto
  isValid: boolean,
  isSelected: boolean,
  completed: boolean,

}

/**
 * Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
 *
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra new
 */
export class ProductosModel implements ProductosInterface {
  constructor(
    public id: number,
    public sID: string,
    public iD_SubGrupoAlimentos: number,
    public sID_SubGrupoAlimentos: string,
    public iD_ETC: number,
    public sID_ETC: string,
    public iD_TiposAlimentos: number,
    public sID_TiposAlimentos: string,
    public iD_TiposUnidad: number,
    public sID_TiposUnidad: string,
    public iD_EstadoRegistro: number,
    public sID_EstadoRegistro: string,
    public iD_RegistroINVIMA: number,
    public sID_RegistroINVIMA: string,
    public numeroRegistroInvima: string,
    public nombre: string,
    public pathlmagenProducto: string,
    public pathlmagenRegistroSanitario: string,
    public baseFruta: boolean,
    public auditoria: string,
    public pathImagenInformacionNutricional: string,
    public fechaRegistro: Date,
    public filtro: string,

    // atributos para gestión de auditoria del objeto
    public _ippublica: string,
    public _nombremaquina: string,
    public _usuario: string,
    public _ipdetrasproxy: string,
    public _browser: string,
    public _accion: string,
    public _sessionid: string,
    public _XMLAuditoria: string,

    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






