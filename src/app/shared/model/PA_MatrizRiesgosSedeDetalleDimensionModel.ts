/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_MatrizRiesgosSedeDetalleDimension
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_MatrizRiesgosSedeDetalleDimensionInterface {

  id_sede: number;
  id_Dimension: number;
  racPreparadaSitio: number;
  racIndustrializada: number;
  catering: number;
  colorRacPreparadaSitio: string;
  colorRacIndustrializada: string;
  colorCatering: string;
  nombreDimension: string;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_MatrizRiesgosSedeDetalleDimensionModel implements PA_MatrizRiesgosSedeDetalleDimensionInterface {
  constructor(

    public id_sede: number,
    public id_Dimension: number,
    public racPreparadaSitio: number,
    public racIndustrializada: number,
    public catering: number,
    public colorRacPreparadaSitio: string,
    public colorRacIndustrializada: string,
    public colorCatering: string,
    public nombreDimension: string,


    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






