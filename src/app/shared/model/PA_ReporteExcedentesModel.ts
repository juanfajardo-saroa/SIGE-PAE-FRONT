/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ReporteExcedentes
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ReporteExcedentesInterface {

  id: number;
  id_sede: number;
  Sede: string;
  id_GradoSedeJornada: number;
  id_Grado: number;
  Grado: string;
  CantExcedentes: number;
  ID_TipoDestinoComplemento: number;
  destinoComplemento: string;
  Id_TipoEstadoExcedentesComplementos: number;
  estadoExcedentesComplementos: string;
  Justificacion: string;



  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

//Modelo constructor que implementa interface
export class PA_ReporteExcedentesModel implements PA_ReporteExcedentesInterface {
  constructor(

    public id: number,
    public id_sede: number,
    public Sede: string,
    public id_GradoSedeJornada: number,
    public id_Grado: number,
    public Grado: string,
    public CantExcedentes: number,
    public ID_TipoDestinoComplemento: number,
    public destinoComplemento: string,
    public Id_TipoEstadoExcedentesComplementos: number,
    public estadoExcedentesComplementos: string,
    public Justificacion: string,


    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






