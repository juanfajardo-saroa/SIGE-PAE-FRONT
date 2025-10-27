import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional, Pipe, PipeTransform } from '@angular/core';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { RepositoriosExtendModel } from 'src/app/shared/model/Repositorios-Extend';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasModel } from 'src/app/shared/model/Categorias';
import { CategoriasService } from 'src/app/shared/services/Categorias.services';
import { TipoArchivoModel } from 'src/app/shared/model/TipoArchivo';
import { TipoArchivoService } from 'src/app/shared/services/TipoArchivo.services';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { RepositoriosAnexosService } from 'src/app/shared/services/RepositoriosAnexos.services';
import { RepositoriosCajaHerramientasService } from 'src/app/shared/services/RepositoriosCajaHerramientas.services';
import { Router } from '@angular/router';
import { RepositoriosAnexosModel } from 'src/app/shared/model/RepositoriosAnexos';
import { RepositoriosCajaHerramientasModel } from 'src/app/shared/model/RepositoriosCajaHerramientas';
import { PA_repositoriosGetAllWithRelationService } from 'src/app/shared/services/PA_repositoriosGetAllWithRelation.services';

@Component({
  selector: 'app-repositorios-lineamientos',
  templateUrl: './repositorios-lineamientos.component.html',
  styleUrls: ['./repositorios-lineamientos.component.scss']
})
export class RepositoriosLineamientosComponent implements OnInit, AfterViewInit, OnDestroy {
  RepositoriosList: RepositoriosExtendModel[] = [];
  RepositoriosAnexosList: RepositoriosAnexosModel[] = [];
  RepositoriosAnexosListCaja: RepositoriosAnexosModel[] = [];
  RepositoriosCajaList: RepositoriosCajaHerramientasModel[] = [];
  fechaConv: any;
  RepositoriosListFilt: any[] = [];
  selectedCategory = '0';
  searchValue:string = '';
  private subs = new Subscription();
  panelOpenState = false;
  RepositoriosObject:RepositoriosExtendModel={
    extension: '',
    sID: 0,
    filtro: '',
    validationErrors: '',
    imagen: '',
    publicacion: 0,
    id: 0,
    idTipoArchivo: 0,
    sidTipoArchivo: '',
    idCategoria: 0,
    sidCategoria: '',
    idVigencia: 0,
    sidVigencia: '',
    pahtArchivo: '',
    nombre: '',
    descripcion: '',
    auditoria: '',
    fechaArchivo: undefined,
    fechaCarga: undefined,
    _ippublica: '',
    _nombremaquina: '',
    _usuario: '',
    _ipdetrasproxy: '',
    _browser: '',
    _accion: '',
    _sessionid: '',
    _XMLAuditoria: '',
    isValid: false,
    isSelected: false,
    diferenciaHoras: 0,
    anexos: undefined,
    id_TipoModeloOperacion: 0,
    nombreResolucion: '',
    tamanoArchivo: '',
    completed: false,
    pahtArchivo2: []
  }
  constructor(
    private RepositoriosService: RepositoriosExtendService,
    public dialog: MatDialog,
    public fechaPi: DatePipe,
    private seguridadService: SeguridadService,
    private _RepositorioAnexosService: RepositoriosAnexosService,
    private  _RepositorioCajaService:RepositoriosCajaHerramientasService,
    private _PA_repositoriosGetAllWithRelationService :PA_repositoriosGetAllWithRelationService,
    private router: Router,
  ) { this.fechaConv = fechaPi;


  }

    ngOnInit(): void {
      this._RepositorioCajaService. getRepositoriosCajaHerramientaList().subscribe(
        (response: any) => {

          this.RepositoriosCajaList = response
          this.RepositoriosCajaList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
          for (let caja in this.RepositoriosCajaList) {
            this.RepositoriosCajaList[caja].extension= this.getFileExtension1(this.RepositoriosCajaList[caja].pathArchivo);
            if (this.RepositoriosCajaList[caja].extension === 'xlsx') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-241.png';
              // this.RepositoriosListFilt.push('Íconos_PAE-241.png')

            } else if (this.RepositoriosCajaList[caja].extension === 'pdf') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-244.png';

            }
            else if (this.RepositoriosCajaList[caja].extension === 'txt') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-248.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'doc') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-242.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'docx') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-242.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'xls') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-241.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'png') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-249.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'jpg') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-250.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'jpeg') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-251.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'gif') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-252.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'csv') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-253.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'json') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-254.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'webp') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-255.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'ppt') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-243.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'pptx') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-243.png';
            }
            else if (this.RepositoriosCajaList[caja].extension === 'zip') {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-245.png';
            }
            else {
              this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-256.png';
            }
            //formatear la fecha
          }

          this._RepositorioAnexosService.getRepositoriosAnexosList().subscribe(
            (response: any) => {
              this.RepositoriosAnexosList = response
              this.RepositoriosAnexosList.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
              for (let anex in this.RepositoriosAnexosList) {
                this.RepositoriosAnexosList[anex].CajaHerramientas=this.RepositoriosCajaList.filter(item=>item.id_AnexoRecurso==this.RepositoriosAnexosList[anex].id)
                this.RepositoriosAnexosList[anex].extension= this.getFileExtension1(this.RepositoriosAnexosList[anex].pathArchivo);
                if (this.RepositoriosAnexosList[anex].extension === 'xlsx') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-241.png';
                  // this.RepositoriosListFilt.push('Íconos_PAE-241.png')

                } else if (this.RepositoriosAnexosList[anex].extension === 'pdf') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-244.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'txt') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-248.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'doc') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-242.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'docx') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-242.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'xls') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-241.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'png') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-249.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'jpg') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-250.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'jpeg') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-251.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'gif') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-252.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'csv') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-253.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'json') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-254.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'webp') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-255.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'ppt') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-243.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'pptx') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-243.png';
                }
                else if (this.RepositoriosAnexosList[anex].extension === 'zip') {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-245.png';
                }
                else {
                  this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-256.png';
                }
                //formatear la fecha
              }

              this.RepositoriosAnexosListCaja=this.RepositoriosAnexosList;
              this._PA_repositoriosGetAllWithRelationService.getPA_repositoriosGetAllWithRelationList(1,Number(localStorage.getItem('VigSeleccionada'))).subscribe(
                (response: any) => {
                 
                  this.RepositoriosList = response;

                  for (let repositorio in this.RepositoriosList) {
                   this.RepositoriosList[repositorio].anexos=  this.RepositoriosAnexosListCaja.filter(item=>item.id_Repositorio==this.RepositoriosList[repositorio].id);

                    if(this.RepositoriosList[repositorio].nombreResolucion === null){
                      this.RepositoriosList[repositorio].nombreResolucion=this.RepositoriosList[repositorio].nombre
                    }
                    this.RepositoriosList[repositorio].extension = this.getFileExtension1(this.RepositoriosList[repositorio].pahtArchivo);
                    this.RepositoriosList[repositorio].fechaArchivo = this.RepositoriosList[repositorio].fechaArchivo;
                    let fecha2 = new Date()
                    let fecha1a = new Date(this.RepositoriosList[repositorio].fechaCarga)
                    let diferncia = (fecha2.getTime() - fecha1a.getTime()) / 1000;
                    diferncia /= (60 * 60);

                    let dife = Math.abs(Math.round(diferncia));
                    this.RepositoriosList[repositorio].publicacion = this.RepositoriosList[repositorio].diferenciaHoras;
                    if (this.RepositoriosList[repositorio].extension === 'xlsx') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-241.png';
                      // this.RepositoriosListFilt.push('Íconos_PAE-241.png')

                    } else if (this.RepositoriosList[repositorio].extension === 'pdf') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-244.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'txt') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-248.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'doc') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-242.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'docx') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-242.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'xls') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-241.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'png') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-249.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'jpg') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-250.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'jpeg') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-251.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'gif') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-252.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'csv') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-253.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'json') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-254.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'webp') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-255.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'ppt') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-243.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'pptx') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-243.png';
                    }
                    else if (this.RepositoriosList[repositorio].extension === 'zip') {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-245.png';
                    }
                    else {
                      this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-256.png';
                    }


                    //formatear la fecha
                  }

                  this.RepositoriosListFilt = this.RepositoriosList;




                },
                (err) => {
                }
              )




            },
            (err) => {
            }
          );


        },
        (err) => {
        }
      );



    }
    ngOnDestroy() {
      if (this.subs) {
        this.subs.unsubscribe();
      }
    }

    ngAfterViewInit(): void {
    }
    getFileExtension1(filename: string) {
      filename = filename.substring(filename.lastIndexOf('.') + 1);
      if (filename != 'pdf' && filename != 'pptx' && filename != 'docx' && filename != 'xlsx'
      && filename != 'txt' && filename != 'doc'&& filename != 'xls'&& filename != 'png'
      && filename != 'jpg' && filename != 'gif'&& filename != 'csv'&& filename != 'ppt'
      && filename != 'pptx'&& filename != 'json'&& filename != 'webp'&& filename != 'zip') { filename = 'othe' }
      return (filename);
    }

    downloadFile(obj: any): void {
      let _fileUpload: fileUploadModel;
      _fileUpload = { file: null, fileName: obj, cnx: environment.cnxBS, container: environment.containerBS };
      (this.RepositoriosService.downloadFileBlobRepositorios(_fileUpload, 'sd')).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: this.getType(obj) });
          saveAs(blob, obj);
        },
        (err) => {
        }
      )
    };
    getType(_response: any): string {
      let fileName = _response;
      //file type extension
      let checkFileType = fileName.split('.').pop();
      var fileType;
      if (checkFileType == ".txt") {
        fileType = "text/plain";
      }
      if (checkFileType == ".pdf") {
        fileType = "application/pdf";
      }
      if (checkFileType == ".doc") {
        fileType = "application/vnd.ms-word";
      }
      if (checkFileType == ".docx") {
        fileType = "application/vnd.ms-word";
      }
      if (checkFileType == ".xls") {
        fileType = "application/vnd.ms-excel";
      }
      if (checkFileType == ".ppt") {
        fileType = "application/vnd.ms-powerpoint";
      }
      if (checkFileType == ".pptx") {
        fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      }
      if (checkFileType == ".png") {
        fileType = "image/png";
      }
      if (checkFileType == ".jpg") {
        fileType = "image/jpeg";
      }
      if (checkFileType == ".jpeg") {
        fileType = "image/jpeg";
      }
      if (checkFileType == ".gif") {
        fileType = "image/gif";
      }
      if (checkFileType == ".csv") {
        fileType = "text/csv";
      }
      if (checkFileType == ".json") {
        fileType = "application/json";
      }
      if (checkFileType == ".webp") {
        fileType = "image/webp";
      }
      if (checkFileType == ".zip") {
        fileType = "application/zip";
      }
      return fileType;
    }
    BuscarRecurso(BusqTitulo:any){

      this.restartfilter();
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.nombreResolucion.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 || t.nombre.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 || t.descripcion.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 )

    }

    restartfilter(): void {
      this.RepositoriosListFilt = this.RepositoriosList;

    }
    onOrdenarpor(ordenar: any) {


      this.searchValue='';
      if (ordenar == 1) {
        this.restartfilter();
        this.RepositoriosListFilt.sort(function (a, b) {


          return new Date(a.fechaArchivo).getTime() - new Date(b.fechaArchivo).getTime();

        });
      }else if(ordenar ==  2){
        this.restartfilter();
        this.RepositoriosListFilt.sort((firstItem, secondItem) => firstItem.publicacion - secondItem.publicacion);
      }else if(ordenar ==  3){
        this.restartfilter();
        this.RepositoriosListFilt.sort(function(a, b) {
          const nameA = a.sidVigencia.toUpperCase(); // ignore upper and lowercase
          const nameB = b.sidVigencia.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }else if (ordenar==0){
        this.restartfilter();
      }


    }

    openDialog(action: string, obj: any): void {
      obj.action = action;
      const dialogRef = this.dialog.open(DialogRepositorioLineamientosContent, {
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
    // tslint:disable-next-line - Disables all
    addRowData(row_obj: RepositoriosExtendModel): void {

    this.RepositoriosObject.auditoria=row_obj.auditoria;
    if(row_obj.descripcion===null){
      this.RepositoriosObject.descripcion='';
    }else{
      this.RepositoriosObject.descripcion=row_obj.descripcion;
    }
    if (row_obj.nombreResolucion === null) {
      this.RepositoriosObject.nombreResolucion = '';
    } else {
      this.RepositoriosObject.nombreResolucion = row_obj.nombre;
    }
    this.RepositoriosObject.fechaArchivo=row_obj.fechaArchivo;
    this.RepositoriosObject.fechaCarga=row_obj.fechaCarga;
    this.RepositoriosObject.idCategoria=row_obj.idCategoria;
    this.RepositoriosObject.idTipoArchivo=5;
    this.RepositoriosObject.idVigencia=row_obj.idVigencia;
    this.RepositoriosObject.pahtArchivo=row_obj.pahtArchivo;
    this.RepositoriosObject.nombre=row_obj.nombre;
      this.RepositoriosService.addRepositoriosE(this.RepositoriosObject).subscribe(
        (response) => {

          this.ngOnInit();
        },
        (err) => {
        }
      );
    }

    // tslint:disable-next-line - Disables all
    updateRowData(row_obj: RepositoriosExtendModel): boolean | any {
      this.RepositoriosService.updateRepositorios(row_obj).subscribe(
        (response) => {

          this.ngOnInit();
        },
        (err) => {
        }
      );
    }

    // tslint:disable-next-line - Disables all
    deleteRowData(row_obj: RepositoriosExtendModel): boolean | any {
      const ideliminar = row_obj.id;

      this.RepositoriosService.deleteRepositorios(ideliminar,row_obj.pahtArchivo,row_obj.nombreResolucion).subscribe(
        (response) => {

          this.ngOnInit();
        },
        (err) => {

        }
      );

    }
    getModulePermission(module:number,action:string):boolean{
      return this.seguridadService.getModulePermission(module,action);

    }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'repositorios-lineamientos.dialog.component.html',
  styleUrls: ["./repositorios-lineamientos.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogRepositorioLineamientosContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;
  maxfileerror: any;
  // Listas relacionales
  CategoriasList: CategoriasModel[];
  contenidoRespuesta:string='';
  TipoArchivoList: TipoArchivoModel[];
  VigenciasList: VigenciasModel[];
  ano: number = new Date().getFullYear();
  constructor(public dialogRef: MatDialogRef<DialogRepositorioLineamientosContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RepositoriosExtendModel,
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    public RepositoriosService: RepositoriosExtendService,
    private tipoArchivoService: TipoArchivoService,
    private vigenciasService: VigenciasService

  ) {

    this.form = this.fb.group({
      id: [data.id],
      idTipoArchivo: [data.idTipoArchivo],
      idCategoria: [data.idCategoria, Validators.required],
      idVigencia: [data.idVigencia, Validators.required],
      pahtArchivo: [data.pahtArchivo],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      auditoria: [''],
      fechaArchivo: [data.fechaArchivo, Validators.required],
      fechaCarga: [new Date()],
      sidCategoria: [data.sidCategoria],
      sidVigencia: [data.sidVigencia],

    });
    this.todosLosFiltros();


    this.local_data = { ...data };
    this.action = this.local_data.action;

  }
  todosLosFiltros(){
    this.categoriasService.getCategoriasList().subscribe(
      (response: any) => {
        this.CategoriasList = response.filter(item => item.id === 1);
      },
      (err) => {
      }

    );
    this.tipoArchivoService.getTipoArchivoList().subscribe(
      (response: any) => {
        this.TipoArchivoList = response;
      },
      (err) => {
      }
    );
    this.vigenciasService.getVigenciasList().subscribe(
      (response: any) => {


        this.VigenciasList = response.filter(item=>item.ano===this.ano);
        this.form.controls['idVigencia'].setValue(this.VigenciasList[0].id);
      },
      (err) => {
      }
    );
  }
  public onFileSelected(File: string | any[]): void {
    if (File[0]) {
      const fileupload = File[0] as File ;
      const formData = new FormData();
      formData.append('file',fileupload);
      let _fileUpload : fileUploadModel;
       _fileUpload = {file:formData, fileName:fileupload.name, cnx:environment.cnxBS, container:environment.containerBS};
        this.addFileBlobRepositorios(_fileUpload);
  }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.form.controls['pahtArchivo'].setValue(String.fromCharCode.apply(null,new Uint8Array(response)));
        this.contenidoRespuesta=String.fromCharCode.apply(null,new Uint8Array(response));
      },
      (err) => {
      }
    );
  }
  mensajeOut() {
    this.maxfileerror = false;
  }


}

