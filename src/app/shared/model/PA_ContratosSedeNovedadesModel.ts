/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ContratosSedeNovedades
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ContratosSedeNovedadesInterface {

  id_IE?: number;
  id_divipola?: number;
  id_Contrato?: number;
  id_sede?: number;
  fecha?: Date;
  descripcion?: string;
  archivo?: string;

  // atributos adicionales genericos para gestión del objeto
  /* isValid: boolean;
  isSelected: boolean;
  completed: boolean; */

}

//Modelo constructor que implementa interface
export class PA_ContratosSedeNovedadesModel implements PA_ContratosSedeNovedadesInterface {
  constructor(

    public id_sede?: number,
    public id_IE?: number,
    public id_Contrato?: number,
    public id_divipola?: number,
    public fecha?: Date,
    public descripcion?: string,
    public archivo?: string,


    // atributos adicionales genericos para gestión del objeto
    /* public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false */

  ) { }
}






