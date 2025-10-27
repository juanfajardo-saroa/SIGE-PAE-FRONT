/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionValidacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_CicloMenuAportesNutricionalesPivInterface {

    columna: string;
    componente: number;
    en_Energia: number;
    ma_Proteina: number;
    ma_CarbohidratosTotales: number;
    ma_GrasasTotales: number;
    mi_Calcio: number;
    mi_Hierro: number;
    mi_Sodio: number;
    mi_VitaminaA: number;
    mi_Zinc: number;
    filtro: string;
    



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_CicloMenuAportesNutricionalesPivModel implements PA_CicloMenuAportesNutricionalesPivInterface {
constructor(

   public columna: string,
    public componente: number,
   public en_Energia: number,
   public ma_Proteina: number,
   public ma_CarbohidratosTotales: number,
   public ma_GrasasTotales: number,
   public mi_Calcio: number,
   public mi_Hierro: number,
  public  mi_Sodio: number,
   public mi_VitaminaA: number,
   public mi_Zinc: number,
   public filtro: string, 
  


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}
