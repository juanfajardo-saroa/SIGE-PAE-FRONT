export interface PA_RolPermisosActualizaRequestInterface {

  id: number;
  id_Rol: string;
  id_Modulo: number;
  ver: boolean;
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
  aprobar: boolean;
  imprimir: boolean;
  auditoria: string;
}

export class PA_RolPermisosActualizaRequestModel implements PA_RolPermisosActualizaRequestInterface {
  constructor(

    public id: number,
    public id_Rol: string,
    public id_Modulo: number,
    public ver: boolean,
    public crear: boolean,
    public editar: boolean,
    public eliminar: boolean,
    public aprobar: boolean,
    public imprimir: boolean,
    public auditoria: string,


  ) { }
}






