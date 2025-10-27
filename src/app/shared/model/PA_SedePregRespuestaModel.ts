/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_SedePregRespuesta
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_SedePregRespuestaInterface {

  id_sede: number;
  municipio: string;
  instEducativa: string;
  sede: string;
  filtro: string;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_SedePregRespuestaModel implements PA_SedePregRespuestaInterface {
  constructor(

    public id_sede: number,
    public municipio: string,
    public instEducativa: string,
    public sede: string,
    public filtro: string,

    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}








