import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

//Interface
export interface GestionExcedentesInterface {

    id: number;
    fechaReporte: Date;
    sedeEducativa:  number; 
    gradoEscolar: number;
    cantidadRaciones: number; 
    destinoRaciones: number;
    justificacion:  string; 
  
  }

//Modelo constructor que implementa interface
export class GestionExcedentesModel implements GestionExcedentesInterface {
    constructor(
  
    public id: number,
    public fechaReporte: Date,
    public sedeEducativa:  number,
    public gradoEscolar: number,
    public cantidadRaciones: number,
    public destinoRaciones: number,
    public justificacion: string,

    ){}
  }
  





