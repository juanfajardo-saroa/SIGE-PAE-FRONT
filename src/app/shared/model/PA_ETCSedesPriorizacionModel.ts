/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ETCSedesPriorizacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ETCSedesPriorizacionInterface {

  id_ETC:number;
Nombre:string;
totalMunicipios:number;
totalMunicipios100SedesClas:number;
totalMunicipiosmenos100SedesClas:number;
totalMunicipiosCeroSedeClas:number;
totalSedes:number;
totalSedesPriorizadaPAE:number;
totalSedesNOPriorizadaPAE:number;
totalSedeClasificar:number;
totalEstudiantes:number;
totalEstudiantesSedePriorizadaPAE:number;
totalEstudiantesSedeNOPriorizadaPAE:number;
totalEstudiantesSedesClasificar:number;
totalMatriMAEM:number;
totalMatriMAER:number;
totalMatriMAIP:number;
totalMatriPAEC:number;



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_ETCSedesPriorizacionModel implements PA_ETCSedesPriorizacionInterface {
constructor(

  public id_ETC:number, 
public Nombre:string, 
public totalMunicipios:number, 
public totalMunicipios100SedesClas:number, 
public totalMunicipiosmenos100SedesClas:number, 
public totalMunicipiosCeroSedeClas:number, 
public totalSedes:number, 
public totalSedesPriorizadaPAE:number, 
public totalSedesNOPriorizadaPAE:number, 
public totalSedeClasificar:number, 
public totalEstudiantes:number, 
public totalEstudiantesSedePriorizadaPAE:number, 
public totalEstudiantesSedeNOPriorizadaPAE:number, 
public totalEstudiantesSedesClasificar:number, 
public totalMatriMAEM:number, 
public totalMatriMAER:number, 
public totalMatriMAIP:number, 
public totalMatriPAEC:number, 


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}






