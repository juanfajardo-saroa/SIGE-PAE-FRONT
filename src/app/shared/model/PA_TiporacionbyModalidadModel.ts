/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_TiporacionbyModalidad
/// Capa			    :SISPAE-Front
/// </Derechos_Reservados>

//Interface
export interface PA_TiporacionbyModalidadInterface {

  iD_TipoComplemento:number;
tipoRacion:string;



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_TiporacionbyModalidadModel implements PA_TiporacionbyModalidadInterface {
constructor(

  public iD_TipoComplemento:number,
public tipoRacion:string,


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}







