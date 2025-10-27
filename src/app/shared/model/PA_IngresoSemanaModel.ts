//Interface
export interface PA_IngresoSemanaInterface {

    nroInserto:number;

// atributos adicionales genericos para gestión del objeto
isValid:boolean;
isSelected:boolean;
completed:boolean;

}

//Modelo constructor que implementa interface
export class PA_IngresoSemanaModel implements PA_IngresoSemanaInterface {
constructor(

    public nroInserto:number, 

// atributos adicionales genericos para gestión del objeto
public  isValid: boolean=true,
public isSelected: boolean = false,
public completed: boolean = false

){}
}



