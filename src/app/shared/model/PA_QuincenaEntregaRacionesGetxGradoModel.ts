/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_QuincenaEntregaRacionesGetxGrado
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_QuincenaEntregaRacionesGetxGradoInterface {

        FechaEntrega:Date;
    racionesDiarias:number;
    ComplementosPreparadas:number;
    ID_TipoReporteEntrega:number;
    Justificacion:string;
    ID_QuincenaEntregaRacion:number;
    pathDocumentoContrato:string;
    id:number;
    nombreTipoReporte:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_QuincenaEntregaRacionesGetxGradoModel implements PA_QuincenaEntregaRacionesGetxGradoInterface {
    constructor(
  
        public FechaEntrega:Date, 
    public racionesDiarias:number, 
    public ComplementosPreparadas:number, 
    public ID_TipoReporteEntrega:number, 
    public Justificacion:string, 
    public ID_QuincenaEntregaRacion:number, 
    public pathDocumentoContrato:string, 
    public id:number, 
    public nombreTipoReporte:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





