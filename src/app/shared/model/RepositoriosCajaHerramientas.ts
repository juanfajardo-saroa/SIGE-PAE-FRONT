/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface RepositoriosCajaHerramientasInterface {

  id: number;
  id_AnexoRecurso: number;
  pathArchivo: string;
  nombre: string;
  descripcion: string;
  auditoria: string;
  fechaActualizacion: Date;
  extension: string;
  imagen: string;
  readonly:boolean;
  editInfo: boolean;
  addInfo: boolean;
  tamanoarchivo:string;
  pahtArchivo2:any;
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

//Modelo constructor que implementa interface
export class RepositoriosCajaHerramientasModel implements RepositoriosCajaHerramientasInterface {
  constructor(

    public id: number,
    public id_AnexoRecurso: number,
    public pathArchivo: string,
    public nombre: string,
    public descripcion: string,
    public auditoria: string,
    public fechaActualizacion: Date,
    public extension: string,
    public imagen: string,
    public readonly:boolean,
    public  editInfo: boolean,
    public addInfo: boolean,
    public   tamanoarchivo:string,
   public pahtArchivo2:any,
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


