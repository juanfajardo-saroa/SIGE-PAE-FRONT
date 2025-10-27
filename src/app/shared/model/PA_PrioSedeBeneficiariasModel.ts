/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeBeneficiarias
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PrioSedeBeneficiariasInterface {

        id_Municipio:number;
    municipio:string;
    id_InstEducativa:number;
    institEducativa:string;
    id_sede:number;
    sede:string;
    priorizadaPAE:boolean;
    matriculaSIMAT:number;
    porcenSISBENAB:number;
    modeloOperacion:string;
    modeloOperacionER:string;
    id_TipoMunicipio:number;
    id_Jornada:number;
    id_NivelEducativo:number;
    id_Zona:number;
    id_CriterioVul:number;
    id_EstadoPrio:number;
    id_ModeloOperacion:number;
    id_ModeloOperacionER:number;
    priorizada:number;
    modeloOperacionTradicional:string;
  check:boolean;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_PrioSedeBeneficiariasModel implements PA_PrioSedeBeneficiariasInterface {
    constructor(
  
        public id_Municipio:number, 
    public municipio:string, 
    public id_InstEducativa:number, 
    public institEducativa:string, 
    public id_sede:number, 
    public sede:string, 
    public priorizadaPAE:boolean, 
    public matriculaSIMAT:number, 
    public porcenSISBENAB:number, 
    public modeloOperacion:string, 
    public modeloOperacionER:string, 
    public id_TipoMunicipio:number, 
    public id_Jornada:number, 
    public id_NivelEducativo:number, 
    public id_Zona:number, 
    public id_CriterioVul:number, 
    public id_EstadoPrio:number, 
    public id_ModeloOperacion:number, 
    public id_ModeloOperacionER:number, 
    public priorizada:number,
    public modeloOperacionTradicional:string,
    public check:boolean,



    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}

  }
  





