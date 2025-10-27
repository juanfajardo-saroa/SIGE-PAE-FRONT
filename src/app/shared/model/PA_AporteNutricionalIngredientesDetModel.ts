/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_AporteNutricionalIngredientes
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>


//Interface
export interface PA_AporteNutricionalIngredientesDetModelInterface {

  iD_Preparacion:number,
  iD_NivelEducativo: number,
  nivelEducativo:string,
  iD_TipoNivelNutriente:number,
  tipoNivelNutriente:string,
  iD_Nutriente:number,
  nutriente:string,
  aporteNutricional:number,
  estado:number,



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_AporteNutricionalIngredientesDetModel implements PA_AporteNutricionalIngredientesDetModelInterface {
constructor(

  public iD_Preparacion:number,
  public iD_NivelEducativo: number,
 public nivelEducativo:string,
  public iD_TipoNivelNutriente:number,
  public tipoNivelNutriente:string,
  public iD_Nutriente:number,
  public nutriente:string,
 public aporteNutricional:number,
 public  estado:number,


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
  
}





