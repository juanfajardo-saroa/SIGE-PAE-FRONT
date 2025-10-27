/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_RiesgoETCModeloOper
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_RiesgoETCModeloOperInterface {

  id_ETC: number;
  id_ModeloOper: number;
  modeloOperativo: string;
  cantidadSede: string;
  priorizadaPAE: boolean;
  porcentajeRPS: number;
  porcentajeRI: number;
  porcentajeCatering: number;
  colorRPS: string;
  colorRI: string;
  colorCatering: string;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_RiesgoETCModeloOperModel implements PA_RiesgoETCModeloOperInterface {
  constructor(

    public id_ETC: number,
    public id_ModeloOper: number,
    public modeloOperativo: string,
    public cantidadSede: string,
    public priorizadaPAE: boolean,
    public porcentajeRPS: number,
    public porcentajeRI: number,
    public porcentajeCatering: number,
    public colorRPS: string,
    public colorRI: string,
    public colorCatering: string,


    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






