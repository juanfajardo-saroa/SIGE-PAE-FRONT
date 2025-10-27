/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_GetRolPermisos
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_GetRolPermisosInterface {

  id: number;
  id_Rol: string;
  id_Modulo: number;
  modulo: string;
  id_Sistema: number;
  sistema: string;
  ver: boolean;
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
  aprobar: boolean;
  imprimir: boolean;
  rol: string;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_GetRolPermisosModel implements PA_GetRolPermisosInterface {
  constructor(

    public id: number,
    public id_Rol: string,
    public id_Modulo: number,
    public modulo: string,
    public id_Sistema: number,
    public sistema: string,
    public ver: boolean,
    public crear: boolean,
    public editar: boolean,
    public eliminar: boolean,
    public aprobar: boolean,
    public imprimir: boolean,
    public rol: string,


    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






