import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { AspNetRolesModel } from 'src/app/shared/model/AspNetRoles';
import { AspNetUsersModel } from 'src/app/shared/model/AspNetUsers';
import { PA_DepartamentosModel } from 'src/app/shared/model/PA_DepartamentosModel';
import { TipoActorModel } from 'src/app/shared/model/TipoActor';
import { TipoDocumentoIdenModel } from 'src/app/shared/model/TipoDocumentoIden';
import { UbicacionesModel } from 'src/app/shared/model/Ubicaciones';
import { AspNetRolesService } from 'src/app/shared/services/AspNetRoles.services';
import { AspNetUsersService } from 'src/app/shared/services/AspNetUsers.services';
import { ETService } from 'src/app/shared/services/ET.services';
import { ETCService } from 'src/app/shared/services/ETC.services';
import { InstitucionEducativaService } from 'src/app/shared/services/InstitucionEducativa.services';
import { OperadoresService } from 'src/app/shared/services/Operadores.services';
import { TipoActorService } from 'src/app/shared/services/TipoActor.services';
import { TipoDocumentoIdenService } from "src/app/shared/services/TipoDocumentoIden.services";
import { UbicacionesService } from 'src/app/shared/services/Ubicaciones.services';

import { GestionUsuariosApiService } from '../../../../../shared/services/gestion-usuarios-api.service';
import { PA_DepartamentosService } from 'src/app/shared/services/PA_Departamentos.services';
import { PA_DivipolasGetbyETCRequest, PA_DivipolasGetbyETCService } from 'src/app/shared/services/PA_DivipolasGetbyETC.services';
import { PA_DivipolasGetbyETCModel } from 'src/app/shared/model/PA_DivipolasGetbyETCModel';
import { PA_InstutucionesEduGetbyETCRequest, PA_InstutucionesEduGetbyETCService } from 'src/app/shared/services/PA_InstutucionesEduGetbyETC.services';
import { PA_InstutucionesEduGetbyETCModel } from 'src/app/shared/model/PA_InstutucionesEduGetbyETCModel';
import { DivipolasService } from 'src/app/shared/services/Divipolas.services';
import { DivipolasModel } from 'src/app/shared/model/Divipolas';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InstitucionEducativaModel } from 'src/app/shared/model/InstitucionEducativa';
import { PA_ListRolCreaService } from 'src/app/shared/services/PA_ListRolCrea.services';
import { PA_ListRolCreaModel } from 'src/app/shared/model/PA_ListRolCreaModel';
import { PA_InstitucionEducativaGetAllWithRelationRequest, PA_InstitucionEducativaGetAllWithRelationService } from 'src/app/shared/services/PA_InstitucionEducativaGetAllWithRelation.services';
import Swal from 'sweetalert2';
import { MessageService } from 'src/app/services/message.service';

export interface UsuarioElemento {
  tipoID: string;
  numeroIdentificacion: string;
  centroAcopioId: number;
  tipoETCId: number;
  numPosicion: number;
  destino: string;
  cabecera: number | null;
  costo: number;
  kilometros: number;
  horas: number;
  medioTransporteId: number;
  centroAcopio: number | null;
  tipoTransporteId: number;
  iconName: string;
  readonly: boolean;
  editInfo: boolean;
  addInfo: boolean;
}

@Component({
  selector: 'app-usuarios',
  providers: [GestionUsuariosApiService],
  templateUrl: './usuarios.component.html',
  styleUrls: ["./usuarios.component.scss"],
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  public errorMessage: string = '';
  public showError: boolean;
  TipoDocumentoIdenList: TipoDocumentoIdenModel[] = [];
  cargueETC: boolean = false;
  displayedColumns: string[] = ['tipoID', 'numeroID', 'nombre', 'apellido', 'correoElectronico', 'celular', 'rol', 'ubicacionBase', 'options'];
  dataArray: any;
  dataSource!: MatTableDataSource<AspNetUsersModel>;
  dataSourceList: any = [];
  AspNetRolesList: AspNetRolesModel[];
  UbicacionesList: any[];
  ubicacionHardList = [
    { id: "ETC", nombre: "ETC" },
    { id: "ET", nombre: "ET" },
    { id: "Operadores", nombre: "Operadores" },
    { id: "InstitucionEducativa", nombre: "Institución educativa" }];
  PA_InstitucionEducativaRequest: PA_InstitucionEducativaGetAllWithRelationRequest = {}
  @ViewChild('fil1') inputName; // accessing the reference element
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private aspNetUsersService: AspNetUsersService,
    private TipoDocumentoIdenService: TipoDocumentoIdenService,
    private aspNetRolesService: AspNetRolesService,
    private seguridadService: SeguridadService,
    private ubicacionesService: UbicacionesService,
    private ETCService: ETCService,
    private ETService: ETService,
    private OperadoresService: OperadoresService,
    private InstitucionEducativaService: InstitucionEducativaService,
    private messageservice: MessageService,
  ) { }

  ngOnInit(): void {
    this.cargueETC = false;
    this.getListUsuarios();

    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primero";
    this.paginator._intl.lastPageLabel = "Último";
  }

  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);
  }

  getListUsuarios() {
    this.aspNetRolesService.getAspNetRolesList().subscribe(
      (response: any) => {
        this.AspNetRolesList = response;
        this.TipoDocumentoIdenService.getTipoDocumentoIdenList().subscribe(
          (response: any) => {
            this.TipoDocumentoIdenList = response;
            this.aspNetUsersService.getAspNetUsersList().subscribe(
              (response: any) => {
                var nombresincortar = localStorage.getItem('Ubicacion')
                var nombrecortado = nombresincortar.split(" | ");
                var nombrecortado = nombresincortar.split("| ");
                var nombrecortado = nombresincortar.split(" |");
                var idUbicacion = localStorage.getItem('IdUbicacion')
                let primernombre = nombrecortado[0];
                if (primernombre === 'Institución educativa' || primernombre === 'institución Educativa') {
                  this.dataArray = response.filter(item => item.ubicacionBase === 'InstitucionEducativa');
                  this.dataArray = this.dataArray.filter(item => item.id_Ubicacion == idUbicacion);
                } else if (primernombre === 'Sin definir' || primernombre == "UApA") {
                  this.dataArray = response
                } else if (primernombre === 'Operadores' || primernombre === 'Operadores ') {
                  //this.dataArray = response.filter(item => item.ubicacionBase === 'Operadores');
                  this.dataArray = []
                }
                else {


                  this.dataArray = response.filter(item => item.ubicacionBase === primernombre);
                  this.dataArray = this.dataArray.filter(item => item.id_Ubicacion == idUbicacion);
                }
                this.dataArray.forEach(element => {
                  element.segundoNombre = element.segundoNombre ? element.segundoNombre : '';
                  element.segundoApellido = element.segundoApellido ? element.segundoApellido : '';
                  element.tipoDocumentoIden = this.TipoDocumentoIdenList.find(tipoDoc => tipoDoc.id == element.id_TipoDocumentoIden).nombre;
                  element.sid_Rol = this.AspNetRolesList.find(rol => rol.id == element.roleId).name;
                  element.sid_RolTempo = this.AspNetRolesList.find(rol => rol.id == element.roleIdTempo) ? this.AspNetRolesList.find(rol => rol.id == element.roleIdTempo).name : "";
                  element.ubicacionBase = this.ubicacionHardList.find(ubicacion => ubicacion.id == element.ubicacionBase) ? this.ubicacionHardList.find(ubicacion => ubicacion.id == element.ubicacionBase).nombre : element.ubicacionBase;
                  if (element.ubicacionBase == "ETC" && this.cargueETC == false) {
                    this.cargueETC = true;
                    this.ETCService.getETCList().subscribe(
                      (response: any) => {
                        this.UbicacionesList = response;

                        element.ubicacion = this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion) ? this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion).nombre : element.ubicacion;
                      },
                      (err) => {
                      }
                    );
                  } else if (element.ubicacionBase == "ET") {
                    this.ETService.getETList().subscribe(
                      (response: any) => {
                        this.UbicacionesList = response;
                        element.ubicacion = this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion) ? this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion).nombre : element.ubicacion;
                      },
                      (err) => {
                      }
                    );
                  } else if (element.ubicacionBase == "Operadores") {
                    this.OperadoresService.getOperadoresList().subscribe(
                      (response: any) => {
                        this.UbicacionesList = response;
                        element.ubicacion = this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion) ? this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion).nombreRazonSocial : element.ubicacion;
                      },
                      (err) => {
                      }
                    );
                  } else if (element.ubicacionBase == "Institución educativa") {
                    this.InstitucionEducativaService.getInstitucionEducativaList().subscribe(
                      (response: any) => {
                        this.UbicacionesList = response;
                        element.ubicacion = this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion) ? this.UbicacionesList.find(ubicacion => ubicacion.id == element.id_Ubicacion).nombre : element.ubicacion;
                      },
                      (err) => {
                      }
                    );
                  }
                });
                this.dataSource = new MatTableDataSource<AspNetUsersModel>(this.dataArray);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              (err) => {
              }
            );
          },
          (err) => {
          }
        )
      },
      (err) => {
      }
    );


  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    
    const dialogRef = this.dialog.open(DialogAspNetUsersContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  }



  addRowData(row_obj: AspNetUsersModel): void {
    
    this.aspNetUsersService.addAspNetUsers(row_obj).subscribe(
      (response) => {
         // clearing the value
    this.inputName.nativeElement.value = ' ';
        this.ngOnInit();
      
      },
      (err) => {
         // clearing the value
    this.inputName.nativeElement.value = ' ';
    this.ngOnInit();
        /* this.errorMessage = err;
        this.showError = false;
        this.messageservice.showWarning(
          'Usuario o email está inactivo',
          'top right'
        ); */
        //this.ngOnInit();
      }
    );
  }


  updateRowData(row_obj: AspNetUsersModel): boolean | any {
    this.aspNetUsersService.updateAspNetUsers(row_obj).subscribe(
      (response) => {
         // clearing the value
    this.inputName.nativeElement.value = ' ';
        this.ngOnInit();
 
      },
      (err) => { // clearing the value
        this.inputName.nativeElement.value = ' ';
            this.ngOnInit();
      }
    );
  }


  deleteRowData(row_obj: AspNetUsersModel): boolean | any {
    const ideliminar = row_obj.id;
    this.aspNetUsersService.deleteAspNetUsers(ideliminar.toString()).subscribe(
      (response) => {
         // clearing the value
    this.inputName.nativeElement.value = ' ';
        this.ngOnInit();
       
      },
      (err) => { // clearing the value
        this.inputName.nativeElement.value = ' ';
            this.ngOnInit();

      }
    );

  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: './list-AspNetUsers.dialog.component.html',
  styleUrls: ["./list-AspNetUsers.dialog.component.scss"],
})


export class DialogAspNetUsersContent {
  maxDocumentId: number = 2;
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  form: FormGroup;
  TipoActorList: TipoActorModel[];
  AspNetRolesList: AspNetRolesModel[];
  AspNetRolesBaseList: AspNetRolesModel[];
  AspNetRolesTempList: AspNetRolesModel[];
  abc: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  symbols: string[] = ['!', '·', '$', '%', '&', '/', '(', ')', '=', '?', '¡'];
  TipoDocumentoIdenList: TipoDocumentoIdenModel[] = [];
  submitted = false;
  igualdoc = false;
  isInstitucion = false;
  prioInstsParams: PA_InstutucionesEduGetbyETCRequest = {};
  UbicacionesList: any[];
  ubicacionHardList = [
    { id: "ETC", nombre: "ETC", idNumber: 3 },
    { id: "ET", nombre: "ET", idNumber: 2 },
    { id: "Operadores", nombre: "Operadores", idNumber: 5 },
    { id: "InstitucionEducativa", nombre: "Institución educativa", idNumber: 1 }];
  departamentosList: PA_DepartamentosModel[];
  divipolaList: PA_DivipolasGetbyETCModel[];
  prioDivolasParams: PA_DivipolasGetbyETCRequest = {};
  institucionList: InstitucionEducativaModel[];
  DivipolasList: DivipolasModel[];
  myControl = new FormControl('');
  filteredOptions: Observable<InstitucionEducativaModel[]>;
  idRolBase: string;
  listRolCrea: PA_ListRolCreaModel[];
  PA_InstitucionEducativaRequest: PA_InstitucionEducativaGetAllWithRelationRequest = {}
  idUbi: string;
  idMun: number;
  idDep: number;
  constructor(public dialogRef: MatDialogRef<DialogAspNetUsersContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AspNetUsersModel,
    private fb: FormBuilder
    , private tipoActorService: TipoActorService,
    public TipoDocumentoIdenService: TipoDocumentoIdenService,
    private aspNetRolesService: AspNetRolesService,
    private ETCService: ETCService,
    private ETService: ETService,
    private divipolasService: DivipolasService,
    private OperadoresService: OperadoresService,
    private InstitucionEducativaService: InstitucionEducativaService,
    private aspNetUsersService: AspNetUsersService,
    private PA_DepartamentosService: PA_DepartamentosService,
    private _PA_DivipolasGetbyETC: PA_DivipolasGetbyETCService,
    private PA_ListRolCrea: PA_ListRolCreaService,
    private _PA_InstitucionEducativaGetAllWithRelationService: PA_InstitucionEducativaGetAllWithRelationService,
  ) {
    this.idRolBase = localStorage.getItem('KeyBase');
    this.PA_ListRolCrea.getPA_ListRolCreaList(this.idRolBase).subscribe(
      (response: any) => {
        this.listRolCrea = response;
      },
      (err) => {
      }
    );
    this.isInstitucion = false;
    this.PA_DepartamentosService.getPA_DepartamentosList().subscribe(
      (response: any) => {
        this.departamentosList = response;
      },
      (err) => {
      }
    );
    this.prioDivolasParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
      (response: any) => {
        this.divipolaList = response;
      },
      (err) => {
      }
    );
    data.ubicacionBase = this.ubicacionHardList.find(ubicacion => ubicacion.nombre == data.ubicacionBase) ? this.ubicacionHardList.find(ubicacion => ubicacion.nombre == data.ubicacionBase).id : "";
    data.id_TipoActor = this.ubicacionHardList.find(ubicacion => ubicacion.nombre == data.ubicacionBase) ? this.ubicacionHardList.find(ubicacion => ubicacion.nombre == data.ubicacionBase).idNumber : 1;
    if (data.ubicacionBase == "ETC") {
      this.ETCService.getETCList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    } else if (data.ubicacionBase == "ET") {
      this.ETService.getETList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    } else if (data.ubicacionBase == "Operadores") {
      this.OperadoresService.getOperadoresList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
          this.UbicacionesList.forEach(element => element.nombre = element.nombreRazonSocial);
        },
        (err) => {
        }
      );
    } else if (data.ubicacionBase == "InstitucionEducativa") {
      this.isInstitucion = true;
      this.InstitucionEducativaService.getInstitucionEducativaList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
          if (data.id_Ubicacion == null || data.id_Ubicacion == undefined) { } else {
            let g = this.UbicacionesList.filter(item => item.id == data.id_Ubicacion);
            //{{item.codigoDane}} - {{item.nombre}}
            this.idUbi = g[0].codigoDane + ' - ' + g[0].nombre;
            this.prioDivolasParams.id_ETC = g[0].iD_ETC;
            this._PA_DivipolasGetbyETC.getPA_DivipolasGetbyETCList(this.prioDivolasParams).subscribe(
              (response: any) => {
                this.DivipolasList = response;
                let mn = this.DivipolasList.filter(item => item.id == g[0].iD_DiviPola);
                this.fillInstituto(mn[0].id);
                this.idMun = mn[0].id;
                this.divipolasService.getDivipolasLisFilterByDivipolas(mn[0].nombre).subscribe(
                  (response: any) => {
                    let h = response
                    this.idDep = h[0].departamentoCode
                    this.onDepartamentoClick(h[0].departamentoCode);
                  },
                  (err) => {
                  }
                );
              },
              (err) => {
              }
            );

          }
        },
        (err) => {
        }
      );
    }

    this.tipoActorService.getTipoActorList().subscribe(
      (response: any) => {
        this.TipoActorList = response;
      },
      (err) => {
      }
    );

    this.TipoDocumentoIdenService.getTipoDocumentoIdenList().subscribe(
      (response: any) => {
        this.TipoDocumentoIdenList = response;
      },
      (err) => {
      }
    )

    this.aspNetRolesService.getAspNetRolesList().subscribe(
      (response: any) => {
        this.AspNetRolesList = response;
        this.AspNetRolesBaseList = this.AspNetRolesList.filter(element => element.id_TipoRoles == 1);
        this.AspNetRolesTempList = this.AspNetRolesList.filter(element => element.id_TipoRoles == 2);
        this.AspNetRolesBaseList.sort(function (a, b) {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        this.AspNetRolesTempList.sort(function (a, b) {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

      },
      (err) => {
      }
    );

    data.passwordHash = this.generatePassword();

    this.form = this.fb.group({
      id: [data.id],
      email: [data.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.minLength(6), Validators.maxLength(50)]],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1000000), Validators.max(999999999999999)]],
      primerNombre: [data.primerNombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]*$')]],
      segundoNombre: [data.segundoNombre, [Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]*$'), Validators.minLength(2), Validators.maxLength(20)]],
      primerApellido: [data.primerApellido, [Validators.required, Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]*$'), Validators.minLength(2), Validators.maxLength(20)]],
      segundoApellido: [data.segundoApellido, [Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]*$'), Validators.minLength(2), Validators.maxLength(20)]],
      cargo: [data.cargo, [Validators.required, Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]*$'), Validators.minLength(3), Validators.maxLength(30)]],
      passwordHash: [data.passwordHash, Validators.required],
      documentoIden: [data.documentoIden, Validators.required],
      id_TipoDocumentoIden: [data.id_TipoDocumentoIden, Validators.required],
      userName: [data.userName],
      roleId: [data.roleId, Validators.required],
      roleIdTempo: [data.roleIdTempo],
      normalizedUserName: [data.normalizedUserName],
      normalizedEmail: [data.normalizedEmail],
      emailConfirmed: [data.emailConfirmed],
      securityStamp: [data.securityStamp],
      concurrencyStamp: [data.concurrencyStamp],
      phoneNumberConfirmed: [data.phoneNumberConfirmed],
      twoFactorEnabled: [data.twoFactorEnabled],
      lockoutEnd: [data.lockoutEnd],
      lockoutEnabled: [data.lockoutEnabled],
      accessFailedCount: [data.accessFailedCount],
      respuestaSeguridad: [data.respuestaSeguridad],
      usuarioAD: [data.usuarioAD],
      photoPath: [data.photoPath],
      fechaCreacion: [data.fechaCreacion],
      auditoria: [data.auditoria],
      id_Ubicacion: [data.id_Ubicacion],
      ubicacionBase: [data.ubicacionBase],
      id_TipoActor: [data.id_TipoActor],
      sid_TipoActor: [data.sid_TipoActor],
      idAspNetUserRolesBase: [data.idAspNetUserRolesBase],
      idAspNetUserRolesTempo: [data.idAspNetUserRolesTempo],
    });

    

    if (data.id_TipoDocumentoIden) {
      this.onTipoDocumentoClick(data.id_TipoDocumentoIden);
    }
    if (!data.ubicacionBase) {
      this.form.get("ubicacionBase").setValue(" ");
    }
    this.local_data = { ...data };
    this.action = this.local_data.action;

  }

  get f() { return this.form.controls; }

  onNumeroIde(): void {
    let value = this.form.get('documentoIden').value;
    this.aspNetUsersService.getAspNetUsersList().subscribe(
      (response: any) => {
        let igualdocx = response.filter(element => element.documentoIden == value);
        if (igualdocx.length > 0) {
          this.igualdoc = true;
        } else {
          this.igualdoc = false;
        }
      },
      (err) => {
        this.igualdoc = false;
      }
    );
  }

  displayFn(id) {
    if (!id) return '';

    let index = this.institucionList.findIndex(institucion => institucion.id === id);
    return this.institucionList[index].codigoDane + " - " + this.institucionList[index].nombre;
  }

  private _filter(value: string): InstitucionEducativaModel[] {
    const filterValue = value.toLowerCase();
    return this.institucionList.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  generatePassword(): string {
    let randomPass = "";
    randomPass = randomPass.concat(this.abc[this.getRandomInt(0, this.abc.length)].toUpperCase());
    for (let index = 0; index < 3; index++) {
      randomPass = randomPass.concat(this.abc[this.getRandomInt(0, this.abc.length)]);
    }
    for (let index = 0; index < 3; index++) {
      randomPass = randomPass.concat(this.getRandomInt(0, 9));
    }
    randomPass = randomPass.concat(this.symbols[this.getRandomInt(0, this.symbols.length)]);
    return randomPass;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });


  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onKeyDocument(e: KeyboardEvent) {
    if (e.keyCode != 8) {
      var type = this.form.get('id_TipoDocumentoIden').value;
      var patt;
      if (type == 12 || type == 3) {
        patt = new RegExp("^[a-zA-Z0-9]*$");
      } else {
        patt = new RegExp("^[0-9]*$");
      }
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }


  onKeyPhone(e: KeyboardEvent) {
    if (e.keyCode != 8) {
      var patt = new RegExp("^[0-9]*$");
      if (!patt.test(e.key)) {
        e.preventDefault();
      }
    }
  }

  onTipoDocumentoClick(value: any): void {
    
    const formDocumentField = this.form.get('documentoIden');
    let elemento: any = document.getElementById('documentoIden');
    if (value == 12) {
      elemento.type = "text";
      this.maxDocumentId = 17;
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9]*$"), Validators.minLength(5), Validators.maxLength(17)]);
    } else if (value == 3) {
      /* elemento.type = "text"; */
      this.maxDocumentId = 11;
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9]*$"), Validators.minLength(5), Validators.maxLength(11)]);
    } else if (value == 1) {
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(10000), Validators.max(99999999999)]);
      this.maxDocumentId = 11;
    } else if (value == 2) {
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(100000), Validators.max(99999999999)]);
      this.maxDocumentId = 11;
    } else if (value == 6) {
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1000000), Validators.max(9999999999)]);
      this.maxDocumentId = 10;
    } else if (value == 13) {
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(100000000), Validators.max(99999999999)]);
      this.maxDocumentId = 11;
    } else {
      formDocumentField.setValidators([Validators.required, Validators.pattern("^[0-9]*$")]);
    }
    formDocumentField.updateValueAndValidity();
  }
  onRolBaseClick(value: any): void {
    this.UbicacionesList = [];
    let nombreRol = this.AspNetRolesBaseList.filter(item => item.id === value);
    if (nombreRol[0].name === 'Líder Control Social ETC/ET' ||
      nombreRol[0].name === 'Rector' || nombreRol[0].name === 'Coordinador' ||
      nombreRol[0].name === 'Directivo Docente' || nombreRol[0].name === 'Manipulador de alimentos' ||
      nombreRol[0].name === 'Docente' || nombreRol[0].name === 'Líder Comités de Alimentación Escolar' ||
      nombreRol[0].name === 'Suplente Comités de Alimentación Escolar'
    ) {
      let n = this.ubicacionHardList.filter(item => item.id === 'InstitucionEducativa')
      this.isInstitucion = true;
      this.form.controls['ubicacionBase'].setValue(n[0].id);
      this.form.controls['id_TipoActor'].setValue(n[0].idNumber);
      this.InstitucionEducativaService.getInstitucionEducativaList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;

        },
        (err) => {
        }
      );

    }
    else if (nombreRol[0].name === 'Operadores - Delegado' || nombreRol[0].name === 'Operadores - Administrador' || nombreRol[0].name === 'Líder Jurídico ETC/ET' || nombreRol[0].name === 'Proveedores' || nombreRol[0].name === 'Operador'
    ) {
      this.isInstitucion = false;
      let n = this.ubicacionHardList.filter(item => item.id === 'Operadores')
      this.form.controls['ubicacionBase'].setValue(n[0].id);
      this.form.controls['id_TipoActor'].setValue(n[0].idNumber);
      this.OperadoresService.getOperadoresList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
          this.UbicacionesList.forEach(element => element.nombre = element.nombreRazonSocial);
        },
        (err) => {
        }
      );
    }
    else if (nombreRol[0].name === 'Coordinador PAE' || nombreRol[0].name === 'Líder de Información' || nombreRol[0].name === 'Coordinador ETC' ||
      nombreRol[0].name === 'Lider contratación/Legal' || nombreRol[0].name === 'Líder financiero' ||
      nombreRol[0].name === 'Líder Gestión Social y Comunicaciones' || nombreRol[0].name === 'Líder Técnico' ||
      nombreRol[0].name === 'Nutricionista - Profesional Técnico' || nombreRol[0].name === 'Asistente Administrativo' ||
      nombreRol[0].name === 'Supervisor de Campo' || nombreRol[0].name === 'Líder contratación/Legal' || nombreRol[0].name === 'Líder Gestión Social y Comunicaciones'
    ) {
      this.isInstitucion = false;
      let n = this.ubicacionHardList.filter(item => item.id === 'ETC')
      this.form.controls['ubicacionBase'].setValue(n[0].id);
      this.form.controls['id_TipoActor'].setValue(n[0].idNumber);
      this.ETCService.getETCList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    }
    else if (nombreRol[0].name === 'Coordinador PAE - ET' || nombreRol[0].name === 'Coordinador ET' ||
      nombreRol[0].name === 'Líder de Información - ET' || nombreRol[0].name === 'Líder contratación/Legal - ET' ||
      nombreRol[0].name === 'Líder financiero - ET' || nombreRol[0].name === 'Líder Gestión Social y Comunicaciones - ET' ||
      nombreRol[0].name === 'Líder Técnico - ET' || nombreRol[0].name === 'Nutricionista - Profesional Técnico - ET' ||
      nombreRol[0].name === 'Asistentes Administrativos - ET' || nombreRol[0].name === 'Supervisor de Campo - ET'

    ) {
      this.isInstitucion = false;
      let n = this.ubicacionHardList.filter(item => item.id === 'ET')
      this.form.controls['id_TipoActor'].setValue(n[0].idNumber);
      this.form.controls['ubicacionBase'].setValue(n[0].id);
      this.ETService.getETList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    }
    else {
      this.isInstitucion = false;
      this.form.controls['ubicacionBase'].setValue(' ');
      this.form.controls['id_Ubicacion'].setValue(null);
      this.form.controls['id_TipoActor'].setValue(1);
    }
  }

  onDepartamentoClick(value: any): void {
    this.divipolasService.getDivipolasLisFilterByDepartamento(value).subscribe(
      (response: any) => {
        this.DivipolasList = response;
      },
      (err) => {
      }
    );
  }

  onMunicipioClick(value: any): void {
    this.prioInstsParams.id_ETC = Number(localStorage.getItem('IdUbicacion'));
    this.prioInstsParams.id_Divipola = value;
    this.fillInstituto(value);
  }
  fillInstituto(id: number): void {
    this.PA_InstitucionEducativaRequest.Id_DiviPola = id;
    this._PA_InstitucionEducativaGetAllWithRelationService.getPA_InstitucionEducativaGetAllWithRelationList(this.PA_InstitucionEducativaRequest).subscribe(
      (response: any) => {
        this.institucionList = response;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      },
      (err) => {
      }
    );
  }
  onUbicacionBaseClick(value: any): void {
    if (value == "ETC") {
      this.ETCService.getETCList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    } else if (value == "ET") {
      this.ETService.getETList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    } else if (value == "Operadores") {
      this.OperadoresService.getOperadoresList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
          this.UbicacionesList.forEach(element => element.nombre = element.nombreRazonSocial);
        },
        (err) => {
        }
      );
    } else if (value == "InstitucionEducativa") {
      this.InstitucionEducativaService.getInstitucionEducativaList().subscribe(
        (response: any) => {
          this.UbicacionesList = response;
        },
        (err) => {
        }
      );
    }
  }



}
