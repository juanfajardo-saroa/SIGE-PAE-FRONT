/**
 * <Derechos_Reservados>
 * 
 * Aplicacion		:SISPAE 
 * 
 * Autor			:TiGlobal SAS y SoftManagement
 * 
 * Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
 * 
 * Ano			    :2number22
 * 
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AlimentosICBF
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
export interface AlimentosICBFInterface {

  id: number;
  sID: string;
  iD_SubGrupoAlimentos: number;
  sID_SubGrupoAlimentos: string;
  iD_TipoAlimento: number;
  sID_TipoAlimento: string;
  iD_ETC: number;
  sID_ETC: string;
  iD_TipoFuenteNutricional: number;
  sID_TipoFuenteNutricional: string;
  auditoria: string;
  pathlmagenAlimento: string;
  pathImagenInformacionNutricional: string;
  porcentajeComestible: number;
  intercambioEstandarizado: number;
  pesoBruto: number;
  nombre: string;
  iD_TiposUnidad: number;
  sID_TiposUnidad: string;
  iD_EstadoRegistro: number;
  sID_EstadoRegistro: string;
  // atributos para gestión de auditoria del objeto

  _ippublica: string;
  _ipa: string;
  _nombremaquina: string;
  _usuario: string;
  _ipdetrasproxy: string;
  _browser: string;
  _accion: string;
  _sessionid: string;
  _XMLAuditoria: string;

  // atributos adicionales genericos para gestión del objeto

  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

/**
 * Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y métodos que dice la interfaz
 *
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra new
 */
export class AlimentosICBFModel implements AlimentosICBFInterface {
  constructor(

    public id: number,
    public sID: string,
    public iD_SubGrupoAlimentos: number,
    public sID_SubGrupoAlimentos: string,
    public iD_TipoAlimento: number,
    public sID_TipoAlimento: string,
    public iD_ETC: number,
    public sID_ETC: string,
    public iD_TipoFuenteNutricional: number,
    public sID_TipoFuenteNutricional: string,
    public auditoria: string,
    public pathlmagenAlimento: string,
    public pathImagenInformacionNutricional: string,
    public porcentajeComestible: number,
    public intercambioEstandarizado: number,
    public pesoBruto: number,
    public nombre: string,
    public iD_TiposUnidad: number,
    public sID_TiposUnidad: string,
    public iD_EstadoRegistro: number,
    public sID_EstadoRegistro: string,

    // atributos para gestión de auditoria del objeto

    public _ippublica: string,
    public _ipa: string,
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






