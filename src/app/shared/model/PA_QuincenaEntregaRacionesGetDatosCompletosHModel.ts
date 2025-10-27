/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_QuincenaEntregaRacionesGetDatosCompletosH
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_QuincenaEntregaRacionesGetDatosCompletosHInterface {

        quincena:string;
    TotalRacionesProgramadas:number;
    RacionesDiariasAsignadas:number;
    RacionesDiariasaPreparar:number;
    RacionesDiariasAlmuerzo:number;
    RacionesDiariasComplemento:number;
    TotalRacionesPreparadas:number;
    TotalRacionesNoPreparadas:number;
    estadoQuincena:string;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_QuincenaEntregaRacionesGetDatosCompletosHModel implements PA_QuincenaEntregaRacionesGetDatosCompletosHInterface {
    constructor(
  
        public quincena:string, 
    public TotalRacionesProgramadas:number, 
    public RacionesDiariasAsignadas:number, 
    public RacionesDiariasaPreparar:number, 
    public RacionesDiariasAlmuerzo:number, 
    public RacionesDiariasComplemento:number, 
    public TotalRacionesPreparadas:number, 
    public TotalRacionesNoPreparadas:number, 
    public estadoQuincena:string, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





