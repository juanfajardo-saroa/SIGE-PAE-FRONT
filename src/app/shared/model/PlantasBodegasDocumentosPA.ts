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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PlantasBodegasDocumentosPA
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
export interface PlantasBodegasDocumentosPAInterface {

  id: number;
  sID: string;
  iD_PlantaBodegas: number;
  siD_PlantaBodegas: string;
  iD_DocumentoPA: number;
  siD_DocumentoPA: string;
  iD_Estado: number;
  sID_Estado: string;
  idVigencia: number;
  sidVigencia: string;
  pathDocumento: string;
  fechaVersion: string,
  nombreArchivo: string,
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
export class PlantasBodegasDocumentosPAModel implements PlantasBodegasDocumentosPAInterface {
  constructor(

    public id: number,
    public sID: string,
    public iD_PlantaBodegas: number,
    public siD_PlantaBodegas: string,
    public iD_DocumentoPA: number,
    public siD_DocumentoPA: string,
    public iD_Estado: number,
    public sID_Estado: string,
    public idVigencia: number,
    public sidVigencia: string,
    public pathDocumento: string,
    public fechaVersion: string,
    public nombreArchivo: string,
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






