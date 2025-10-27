/// <Derechos_Reservados>
/// Aplicacion    :SISPAE
/// Autor         :TiGlobal SAS y SoftManagement
/// Generacion    :Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano           :2022
/// Arquitectura  :Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionNivel2
/// Capa          :SISPAE-Front
/// </Derechos_Reservados>
//Interface
export interface GetCaracterizacionNivel2Interface {
  categoria1erNivel: string;
  idCategoria2doNivel: number;
  categoria2doNivel: string;
  iconoCategoria: string;
  idPregunta: number;
  pregunta: string;
  iconoPregunta2doNivel: string;
  idEscala: number;
  nombreEscala: string;
  ordenPregunta: number;
  idPreguntaPadre: number;
  tercerNivel: number;
  id: number;
  activar: boolean;
  tipoPregunta: number;
  mostrarIcono: boolean;
  // atributos adicionales genericos para gestión del objeto
  isValid: boolean;
  isSelected: boolean;
  completed: boolean;
  valorRespuesta: number;
  contenidoRespuesta: string;
}
//Modelo constructor que implementa interface
export class GetCaracterizacionNivel2Model implements GetCaracterizacionNivel2Interface {
  constructor(
    public categoria1erNivel: string,
    public idCategoria2doNivel: number,
    public categoria2doNivel: string,
    public iconoCategoria: string,
    public idPregunta: number,
    public pregunta: string,
    public iconoPregunta2doNivel: string,
    public idEscala: number,
    public nombreEscala: string,
    public ordenPregunta: number,
    public idPreguntaPadre: number,
    public tercerNivel: number,
    public id: number,
    public activar: boolean = false,
    public tipoPregunta: number,
    public mostrarIcono:  boolean = false,

    // atributos adicionales genericos para gestión del objeto
    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false,
    public valorRespuesta: number,
    public contenidoRespuesta: string,
  ) { }
}