/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_DiagnosticoInfraEst
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_DiagnosticoInfraEstInterface {

        id_sede:number;
    Municipio:string;
    InstEducativa:string;
    Sede:string;
    PriorizadaPAE:boolean;
    ConHigienico:boolean;
    DotacionEq:number;
    Electricidad:boolean;
    Alcantarillado:boolean;
    RecBasuras:boolean;
    AguaPotable:boolean;
    Gas:boolean;
    Almacenamiento:boolean;
    Preparacion:boolean;
    Consumo:boolean;
    DispResiduos:boolean;
    AreaSanitarias:boolean;
    Diagnostico:number;
    EstadoCaract :string;
    auditoria:string;

    // atributos para gestión de auditoria del objeto
    _ippublica: string;
    _nombremaquina: string ;
    _usuario: string ;
    _ipdetrasproxy: string ;
    _browser: string ;
    _accion: string ;
    _sessionid: string ;
    _XMLAuditoria: string ;
    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_DiagnosticoInfraEstModel implements PA_DiagnosticoInfraEstInterface {
    constructor(
  
        public id_sede:number, 
    public Municipio:string, 
    public InstEducativa:string, 
    public Sede:string, 
    public PriorizadaPAE:boolean, 
    public ConHigienico:boolean, 
    public DotacionEq:number, 
    public Electricidad:boolean, 
    public Alcantarillado:boolean, 
    public RecBasuras:boolean, 
    public AguaPotable:boolean, 
    public Gas:boolean, 
    public Almacenamiento:boolean, 
    public Preparacion:boolean, 
    public Consumo:boolean, 
    public DispResiduos:boolean, 
    public AreaSanitarias:boolean, 
    public Diagnostico:number, 
    public EstadoCaract :string, 
    public auditoria:string,
        // atributos para gestión de auditoria del objeto
        public _ippublica: string,
        public _nombremaquina: string,
        public _usuario: string,
        public _ipdetrasproxy: string,
        public _browser: string,
        public _accion: string,
        public _sessionid: string,
        public  _XMLAuditoria: string ,
        // atributos adicionales genericos para gestión del objeto
        public  isValid: boolean=true,
        public isSelected: boolean = false,
        public completed: boolean = false

  
    ){}
  }
  





