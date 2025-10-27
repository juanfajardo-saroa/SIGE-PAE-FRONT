export interface PA_MenuRolActualizaInterface {

  id: number;
  Id_Menu: string;
  AspNetRoles: number;
  Estado: boolean;
  auditoria: string;
}

export class PA_MenuRolActualizaModel implements PA_MenuRolActualizaInterface {
  constructor(

    public id: number,
    public Id_Menu: string,
    public AspNetRoles: number,
    public Estado: boolean,
    public auditoria: string,


  ) { }
}






