/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_MatrizRiesgosSedeDetalleArea
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_NivelEducativoPesoServidoPivInterface {

  iD_TipoNivelEducativo:number;
  nivelEducativo:string;
  complementoAlmuerzo:number;
  complementoAM_PM:number;
  complementoAlmuerzoCualificado:number;
  sinComplemento:number;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_NivelEducativoPesoServidoPivModel implements PA_NivelEducativoPesoServidoPivInterface {
  constructor(

    public iD_TipoNivelEducativo:number,
  public nivelEducativo:string,
  public complementoAlmuerzo:number,
  public complementoAM_PM :number,
 public  complementoAlmuerzoCualificado:number,
 public sinComplemento:number,

    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






