/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad PA_ETCMunicipioRacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface PA_ETCMunicipioRacionInterface {

  id_ETC:number;
Nombre :string;
totalMunicipiosBeneficiarios:number;
totalMunicipios100Sedes:number;
totalMunicipiosmenos100Sedes:number;
totalMunicipiosNingunaSede:number;
totalSedesBeneficiarias:number;
totalSedesRacionCompleta:number;
totalSedesRacionIncompleta:number;
totalSedespendientes:number;



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_ETCMunicipioRacionModel implements PA_ETCMunicipioRacionInterface {
constructor(

  public id_ETC:number, 
public Nombre :string, 
public totalMunicipiosBeneficiarios:number, 
public totalMunicipios100Sedes:number, 
public totalMunicipiosmenos100Sedes:number, 
public totalMunicipiosNingunaSede:number, 
public totalSedesBeneficiarias:number, 
public totalSedesRacionCompleta:number, 
public totalSedesRacionIncompleta:number, 
public totalSedespendientes:number, 


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}






