/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ComplemetosEntregadosPorGrados
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ComplemetosEntregadosPorGradosInterface {

        Fecha:Date;
    ComplementoDiarioPrio:number;
    ComplementoDiarioPrepa:number;
    ReporteEntrega:string;
    Justificacion:string;
    pathDocumentoContrato:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_ComplemetosEntregadosPorGradosModel implements PA_ComplemetosEntregadosPorGradosInterface {
    constructor(
  
        public Fecha:Date, 
    public ComplementoDiarioPrio:number, 
    public ComplementoDiarioPrepa:number, 
    public ReporteEntrega:string, 
    public Justificacion:string, 
    public pathDocumentoContrato:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





