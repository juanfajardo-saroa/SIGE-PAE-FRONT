/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_RiesgoETCModeloOper
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_RiesgoETCSedesModeloOperInterface {

  id_sede: number;
  municipio: string;
  instEducativa: string;
  cantidadSede: string;
  sede: string;
  codigoDane?: string;
 



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_RiesgoETCSedesModeloOperModel implements PA_RiesgoETCSedesModeloOperInterface {
  constructor(

    public id_sede: number,
    public municipio: string,
    public instEducativa: string,
    public cantidadSede: string,
    public sede: string,
    public codigoDane?: string,


    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






