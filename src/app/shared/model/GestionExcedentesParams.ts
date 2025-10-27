//Interface
export interface GestionExcedentesParamsInterface {

    numeroEstudiantes: number;
    cantidadRacionesDiarias: number;
    cantidadRacionesAsignadas: number;
  
  }

//Modelo constructor que implementa interface
export class GestionExcedentesParamsModel implements GestionExcedentesParamsInterface {
    constructor(
  
       public numeroEstudiantes: number,
       public cantidadRacionesDiarias: number,
       public cantidadRacionesAsignadas: number,
    ){}
  }