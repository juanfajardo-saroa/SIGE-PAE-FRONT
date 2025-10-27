/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_RolPermisosActualiza
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_RolPermisosActualizaInterface {

        Id:number;
    Id_Rol:string;
    Id_Modulo:number;
    Ver:boolean;
    Crear:boolean;
    Editar:boolean;
    Eliminar:boolean;
    Aprobar:boolean;
    Imprimir:boolean;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_RolPermisosActualizaModel implements PA_RolPermisosActualizaInterface {
    constructor(
  
        public Id:number, 
    public Id_Rol:string, 
    public Id_Modulo:number, 
    public Ver:boolean, 
    public Crear:boolean, 
    public Editar:boolean, 
    public Eliminar:boolean, 
    public Aprobar:boolean, 
    public Imprimir:boolean, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





