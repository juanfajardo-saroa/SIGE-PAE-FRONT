/// <Derechos_Reservados>
/// Aplicacion		:SISPAE
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_PrioSedeAsignaRacion
/// Capa			    :SISPAE-Front
/// </Derechos_Reservados>

//Interface
export interface PA_PrioSedeAsignaRacionInterface {

        id_Municipio:number;
    Municipio:string;
    id_InstEducativa:number;
    InstEducativa:string;
    id_sede:number;
    Sede:string;
    MatriculaSIMAT:number;
    ModeloOperacion:string;
    ModeloOperacionER:string;
    ModalidadSugerida:string;
    RacionDiaria:number;
    id_TipoMunicipio:number;
    id_Jornada:number;
    id_NivelEducativo:number;
    id_Zona:number;
    id_CriterioVul:number;
    id_EstadoPrio:number;
    estadoPriorizacion:string;


    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;

  }

//Modelo constructor que implementa interface
export class PA_PrioSedeAsignaRacionModel implements PA_PrioSedeAsignaRacionInterface {
    constructor(

        public id_Municipio:number,
    public Municipio:string,
    public id_InstEducativa:number,
    public InstEducativa:string,
    public id_sede:number,
    public Sede:string,
    public MatriculaSIMAT:number,
    public ModeloOperacion:string,
    public ModeloOperacionER:string,
    public ModalidadSugerida:string,
    public RacionDiaria:number,
    public id_TipoMunicipio:number,
    public id_Jornada:number,
    public id_NivelEducativo:number,
    public id_Zona:number,
    public id_CriterioVul:number,
    public id_EstadoPrio:number,
public estadoPriorizacion:string,

    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false

    ){}
  }






