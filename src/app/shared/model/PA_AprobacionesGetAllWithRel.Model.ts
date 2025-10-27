/// <Derechos_Reservados>
/// Aplicacion		:SISPAE 
/// Autor			    :TiGlobal SAS y SoftManagement
/// Generacion		:Este archivo es generado automaticamente mediante generador GeneraApp.
/// Ano			      :2022
/// Arquitectura	:Modelo Base de Angular para Arquitectura Microservicios de la Entidad GetCaracterizacionValidacion
/// Capa			    :SISPAE-Front 
/// </Derechos_Reservados>

//Interface
export interface GetAprobacionesGetAllWithRelInterface {

    id: number;
    iD_ETC: number;
    iD_User: number;
    iD_AccionAprobacion: number;
    id_Secciones: number;
    documentoParaAprobar: string;
    fechaAprobacion: Date;
    fecha: Date;
    id_Ubicacion: number;
    ubicacionOrigen: string;
    sID_AccionAprobacion: string;
    sId_Secciones: string;
    sId_Ubicacion: string;
    sID_ETC: string;
    sID_User: string;
    sID_Submodulos: string;
    sID_Subsistemas: string;
    sID_SubsistemasG: string;
    sPorAprobar: string,
    iD_Submodulos: number;
    iD_Subsistemas: number;
    filtro: string;
    id_Rol:number;
    sID_rol:string;
    plazoPorAprobar:Date;



// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class GetAprobacionesGetAllWithRelModel implements GetAprobacionesGetAllWithRelInterface {
constructor(

   public id: number,
   public iD_ETC: number,
   public iD_User: number,
   public iD_AccionAprobacion: number,
   public id_Secciones: number,
   public documentoParaAprobar: string,
   public fechaAprobacion: Date,
   public fecha: Date,
   public id_Ubicacion: number,
   public ubicacionOrigen: string,
   public sID_AccionAprobacion: string,
   public sId_Secciones: string,
   public sId_Ubicacion: string,
   public sID_ETC: string,
   public sID_User: string,
   public sID_Submodulos: string,
   public sID_Subsistemas: string,
   public sID_SubsistemasG: string,
   public sPorAprobar: string,
   public iD_Submodulos: number,
   public iD_Subsistemas: number,
   public filtro: string, 
   public id_Rol:number,
   public sID_rol:string,
   public plazoPorAprobar:Date,


// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}
