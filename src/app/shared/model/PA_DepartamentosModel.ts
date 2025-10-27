/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_Departamentos
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_DepartamentosInterface {

  departamentoCode: string;
  departamentoNombre: string;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_DepartamentosModel implements PA_DepartamentosInterface {
  constructor(

    public departamentoCode: string,
    public departamentoNombre: string,


    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






