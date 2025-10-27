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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PlantaBodegas
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
export interface PlantaBodegasInterface {

  id: number;
  sID: string;
  iD_TipoPlantaBodega: number;
  siD_TipoPlantaBodega: string;
  iD_PlanAlistamiento: number;
  siD_PlanAlistamiento: string;
  iD_Divipola: number;
  siD_Divipola: string;
  iD_EstadoPlantaBodega: number;
  sID_EstadoPlantaBodega: string;
  nombre: string;
  direccion: string;
  celular: string;
  nombreContacto: string;
  apellidoContacto: string;
  correo: string;
  auditoria: string;


  // atributos para gestión de auditoria del objeto
  _ippublica: string;
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
 * En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
 */
export class PlantaBodegasModel implements PlantaBodegasInterface {
  constructor(

    public id: number,
    public sID: string,
    public iD_TipoPlantaBodega: number,
    public siD_TipoPlantaBodega: string,
    public iD_PlanAlistamiento: number,
    public siD_PlanAlistamiento: string,
    public iD_Divipola: number,
    public siD_Divipola: string,
    public iD_EstadoPlantaBodega: number,
    public sID_EstadoPlantaBodega: string,
    public nombre: string,
    public direccion: string,
    public celular: string,
    public nombreContacto: string,
    public apellidoContacto: string,
    public correo: string,
    public auditoria: string,

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






