import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

//Interface
export interface DiagnosticoAprobacionesInterface {

    fecha: Date;
    responsable:  string; 
    rol: string;
    accion: string; 
    observaciones:  string; 
  
  }

//Modelo constructor que implementa interface
export class DiagnosticoAprobacionesModel implements DiagnosticoAprobacionesInterface {
    constructor(

    public fecha: Date,
    public responsable:  string,
    public rol: string,
    public accion: string,
    public observaciones: string,

    ){}
  }
  