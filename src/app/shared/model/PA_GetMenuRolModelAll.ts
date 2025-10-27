
export interface PA_GetMenuRolAllInterface {

  id: number;
  id_Menu: number;
  menu: string;
  rol: string;
  estado: boolean;

  isValid: boolean;
  isSelected: boolean;
  completed: boolean;

}

export class PA_GetMenuRolAllModel implements PA_GetMenuRolAllInterface {
  constructor(

    public id: number,
    public id_Menu: number,
    public menu: string,
    public rol: string,
    public estado: boolean,

    public isValid: boolean = true,
    public isSelected: boolean = false,
    public completed: boolean = false

  ) { }
}






