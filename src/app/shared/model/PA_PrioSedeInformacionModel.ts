/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeInformacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_PrioSedeInformacionInterface {

        Id_sede:number;
    ModeloOperativo:string;
    PoblacionVul:number;
    TipoMunicipio:string;
    ModalidaSugerida:string;
    EstadoAsignacion:string;
    EstudianteSisbenAB:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_PrioSedeInformacionModel implements PA_PrioSedeInformacionInterface {
    constructor(
  
        public Id_sede:number, 
    public ModeloOperativo:string, 
    public PoblacionVul:number, 
    public TipoMunicipio:string, 
    public ModalidaSugerida:string, 
    public EstadoAsignacion:string, 
    public EstudianteSisbenAB:number, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





