/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_AporteNutricionalIngredientes
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>


//Interface
export interface PA_AportesComponentePreparacionDetModelInterface {

  iD_GrupoAlimentos:number;
  grupoAlimentos:string;
  iD_SubGrupoAlimentos:number;
  subGrupoAlimentos:string;
  pesoNetoPreparacion:number;
  estado:number;
  iD_TipoComplemento:number;
  iD_NivelEducativo:number;
  tipoComplemento:string;
  nivelEducativo:string;


// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_AportesComponentePreparacionDetModel implements PA_AportesComponentePreparacionDetModelInterface {
constructor(

  public iD_GrupoAlimentos:number,
  public grupoAlimentos:string,
  public iD_SubGrupoAlimentos:number,
  public subGrupoAlimentos:string,
  public pesoNetoPreparacion:number,
  public estado:number,
  public iD_TipoComplemento:number,
  public iD_NivelEducativo:number,
  public tipoComplemento:string,
  public nivelEducativo:string,


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
  
}





