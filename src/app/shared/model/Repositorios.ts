/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad Repositorios
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface RepositoriosInterface {


  id: number;
  idTipoArchivo: number;
  sidTipoArchivo: string;
  idCategoria: number;
  id_TipoModeloOperacion: number;
  nombreResolucion: string;
  sidCategoria: string;
  idVigencia: number;
  sidVigencia: string;
  pahtArchivo: string;
  nombre: string;
  descripcion: string;
  auditoria: string;
  fechaArchivo: Date;
  fechaCarga: Date;
  tamanoArchivo:string;

diferenciaHoras:number;


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
export class RepositoriosModel implements RepositoriosInterface {
  constructor(


    public id: number,
    public idTipoArchivo: number,
    public sidTipoArchivo: string,
    public idCategoria: number,
    public id_TipoModeloOperacion: number,
    public nombreResolucion: string,
    public sidCategoria: string,
    public idVigencia: number,
    public sidVigencia: string,
    public pahtArchivo: string,
    public nombre: string,
    public descripcion: string,
    public auditoria: string,
    public fechaArchivo: Date,
    public fechaCarga: Date,
    public tamanoArchivo:string,

  public diferenciaHoras:number,


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


