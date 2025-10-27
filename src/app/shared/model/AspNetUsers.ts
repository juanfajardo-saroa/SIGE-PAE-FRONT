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
 * Arquitectura	    :Modelo Base de Angular para Arquitectura Microservicios de la Entidad AspNetUsers
 *
 * Capa			    :SISPAE-Front
 *
 * </Derechos_Reservados>
 */

import { NumberValueToken } from "html2canvas/dist/types/css/syntax/tokenizer";


/**
 * Definicion de Interface  con los atributos del objeto, desprovistas de inicializaciÃ³n y funcionalidad,
 *
 *  La interfaz es el contrato entre el mundo exterior y la clase
 */
export interface AspNetUsersInterface {

  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  cargo: string;
  respuestaSeguridad: string;
  usuarioAD: string;
  gUID: string;
  photoPath: string;
  fechaCreacion: Date;
  auditoria: string;
  id_Ubicacion: number;
  ubicacionBase: string;
  id_TipoActor: number;
  sid_TipoActor: string;
  documentoIden: string;
  id_TipoDocumentoIden: number;
  sid_TipoDocumentoIden: string;
  roleId: string;
  roleIdTempo: string;
  idAspNetUserRolesTempo: number;
  idAspNetUserRolesBase: number;

  // atributos para gestiÃ³n de auditoria del objeto
  _ippublica: string;
  _nombremaquina: string;
  _usuario: string;
  _ipdetrasproxy: string;
  _browser: string;
  _accion: string;
  _sessionid: string;
  _XMLAuditoria: string;
  // atributos adicionales genericos para gestiÃ³n del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

/**
* Clase Modelo constructor que implementa interface, esta clase tiene que declarar todos los atributos y mÃ©todos que dice la interfaz
*
* En caso de usar clases, tus nuevos objetos deben ser creados con la palabra "new"
*/
export class AspNetUsersModel implements AspNetUsersInterface {
  constructor(

    public id: string,
    public userName: string,
    public normalizedUserName: string,
    public email: string,
    public normalizedEmail: string,
    public emailConfirmed: boolean,
    public passwordHash: string,
    public securityStamp: string,
    public concurrencyStamp: string,
    public phoneNumber: string,
    public phoneNumberConfirmed: boolean,
    public twoFactorEnabled: boolean,
    public lockoutEnd: string,
    public lockoutEnabled: boolean,
    public accessFailedCount: number,
    public primerNombre: string,
    public segundoNombre: string,
    public primerApellido: string,
    public segundoApellido: string,
    public cargo: string,
    public respuestaSeguridad: string,
    public usuarioAD: string,
    public gUID: string,
    public photoPath: string,
    public fechaCreacion: Date,
    public auditoria: string,
    public id_Ubicacion: number,
    public ubicacionBase: string,
    public id_TipoActor: number,
    public sid_TipoActor: string,
    public documentoIden: string,
    public id_TipoDocumentoIden: number,
    public sid_TipoDocumentoIden: string,
    public roleId: string,
    public roleIdTempo: string,
    public idAspNetUserRolesTempo: number,
    public idAspNetUserRolesBase: number,

    // atributos para gestiÃ³n de auditoria del objeto
    public _ippublica: string,
    public _nombremaquina: string,
    public _usuario: string,
    public _ipdetrasproxy: string,
    public _browser: string,
    public _accion: string,
    public _sessionid: string,
    public _XMLAuditoria: string,
    // atributos adicionales genericos para gestiÃ³n del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






