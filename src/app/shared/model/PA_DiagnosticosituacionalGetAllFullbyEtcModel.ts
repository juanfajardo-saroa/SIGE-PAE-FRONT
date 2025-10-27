/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_DiagnosticoSituacionalGetAllFullbyEtc
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_DiagnosticoSituacionalGetAllFullbyEtcInterface {

  id:number;
nombre:string;
fechaActualizacion:Date;
descripcionDiagnostico:string;
auditoria:string;
pathDiasnosticoSituacion:string;



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_DiagnosticoSituacionalGetAllFullbyEtcModel implements PA_DiagnosticoSituacionalGetAllFullbyEtcInterface {
constructor(

  public id:number, 
public nombre:string, 
public fechaActualizacion:Date, 
public descripcionDiagnostico:string, 
public auditoria:string, 
public  pathDiasnosticoSituacion:string,

// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}




