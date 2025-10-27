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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_IngredientesGetAllWithRelation
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
export interface PA_IngredientesGetAllWithRelationInterface {
  sID: string;
  id: number;
  iD_AlimentosICBF: number;
  sID_AlimentosICBF: string;
  iD_TipoNivelEducativo: number;
  sID_TipoNivelEducativo: string;
  iD_Producto: number;
  iD_Preparacion: number;
  siD_Preparacion: string;
  iD_TipoComplemento:number;
 sID_TipoComplemento:string;
  pesoBruto: number;
  pesoNeto: number;
  porcentajeComestible: number;
  intercambioEstandarizado: number;
  auditoria: string;
  estado:string;
  ModificacionEstado:boolean;
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
export class PA_IngredientesGetAllWithRelationModel implements PA_IngredientesGetAllWithRelationInterface {
  constructor(

    public sID: string,
 public  id: number,
  public iD_AlimentosICBF: number,
  public sID_AlimentosICBF: string,
 public iD_TipoNivelEducativo: number,
  public sID_TipoNivelEducativo: string,
  public iD_Producto: number,
  public iD_Preparacion: number,
  public siD_Preparacion: string,
  public iD_TipoComplemento:number,
  public sID_TipoComplemento:string,
  public pesoBruto: number,
  public pesoNeto: number,
  public porcentajeComestible: number,
  public intercambioEstandarizado: number,
  public auditoria: string,
  public estado:string,
  public ModificacionEstado:boolean,

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






