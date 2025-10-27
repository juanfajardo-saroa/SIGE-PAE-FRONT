/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_SeguimientoRacionesDetalleSemana
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_SeguimientoRacionesDetalleSemanaInterface {

        numero_semana:number;
    fecha_inicial:Date;
    fecha_final:Date;
    estado:number;
    dias_pae:string;
    complementos_preparar:number;
    complemetos_almuerzos:number;
    complemetos_anpm:number;
    total_complementos_Programados:number;
    total_complementos_Preparados:number;
    total_complementos_no_Preparados:number;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_SeguimientoRacionesDetalleSemanaModel implements PA_SeguimientoRacionesDetalleSemanaInterface {
    constructor(
  
        public numero_semana:number, 
    public fecha_inicial:Date, 
    public fecha_final:Date, 
    public estado:number, 
    public dias_pae:string, 
    public complementos_preparar:number, 
    public complemetos_almuerzos:number, 
    public complemetos_anpm:number, 
    public total_complementos_Programados:number, 
    public total_complementos_Preparados:number, 
    public total_complementos_no_Preparados:number,


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





