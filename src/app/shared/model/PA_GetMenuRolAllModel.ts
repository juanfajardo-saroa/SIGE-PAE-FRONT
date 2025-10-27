/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_GetMenuRolAll
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_GetMenuRolAllInterface {

        Id:number;
    Id_Menu:number;
    Menu:string;
    Rol:string;
    Estado:boolean;

  

    // atributos adicionales genericos para gestión del objeto
    isValid:boolean;
    isSelected:boolean;
    completed:boolean;
  
  }

//Modelo constructor que implementa interface
export class PA_GetMenuRolAllModel implements PA_GetMenuRolAllInterface {
    constructor(
  
        public Id:number, 
    public Id_Menu:number, 
    public Menu:string, 
    public Rol:string, 
    public Estado:boolean, 


    // atributos adicionales genericos para gestión del objeto
    public  isValid: boolean=true,
    public isSelected: boolean = false,
    public completed: boolean = false
  
    ){}
  }
  





