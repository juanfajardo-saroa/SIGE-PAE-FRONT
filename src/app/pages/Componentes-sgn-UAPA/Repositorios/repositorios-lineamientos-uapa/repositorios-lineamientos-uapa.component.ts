import { ModeloOperacion } from 'src/app/shared/model/core/constante.model';
import { RepositoriosCajaHerramientasModel } from './../../../../shared/model/RepositoriosCajaHerramientas';
import { RepositoriosAnexosModel } from './../../../../shared/model/RepositoriosAnexos';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
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
import { MessageService } from 'src/app/services/message.service';
import { TiposModeloOperacionService } from 'src/app/shared/services/TiposModeloOperacion.services';
import { RepositoriosAnexosService } from 'src/app/shared/services/RepositoriosAnexos.services';
import { RepositoriosCajaHerramientasService } from 'src/app/shared/services/RepositoriosCajaHerramientas.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PA_repositoriosGetAllWithRelationService } from 'src/app/shared/services/PA_repositoriosGetAllWithRelation.services';

@Component({
  selector: 'app-repositorios-lineamientos-uapa',
  templateUrl: './repositorios-lineamientos-uapa.component.html',
  styleUrls: ['./repositorios-lineamientos-uapa.component.scss']
})
export class RepositoriosLineamientosUapaComponent implements OnInit, AfterViewInit, OnDestroy {

  RepositoriosList: RepositoriosExtendModel[] = [];
  RepositoriosAnexosList: RepositoriosAnexosModel[] = [];
  RepositoriosAnexosListCaja: RepositoriosAnexosModel[] = [];
  RepositoriosCajaList: RepositoriosCajaHerramientasModel[] = [];
  fechaConv: any;
  RepositoriosListFilt: any[] = [];
  selectedCategory = '0';
  searchValue: string = '';
  private subs = new Subscription();
  panelOpenState = false;
  RepositoriosObject: RepositoriosExtendModel = {
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
    completed: false,
    id_TipoModeloOperacion: 0,
    nombreResolucion: '',
    anexos: [],
    tamanoArchivo: '',
    diferenciaHoras: 0,
    pahtArchivo2: '',
  }
  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
  mostarEncabezadoMenu: boolean = true;
  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  nombreVigAnoSeleccionada: number = 0;
  public dataArraySelectVig: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;

  public nombreUbicacion = 'UApA | Repositorio';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  public dataArrayInterno: any;
  public dataArray: any;
  isLoading = true;
  constructor(
    private RepositoriosService: RepositoriosExtendService,
    public dialog: MatDialog,
    public fechaPi: DatePipe,
    private seguridadService: SeguridadService,
    private _RepositorioAnexosService: RepositoriosAnexosService,
    private _RepositorioCajaService: RepositoriosCajaHerramientasService,
    private router: Router,
    public VigenciasServicio: VigenciasService,
    private _PA_repositoriosGetAllWithRelationService: PA_repositoriosGetAllWithRelationService,
  ) {
    this.fechaConv = fechaPi;

  }

  ngOnInit(): void {
    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArray = response.filter(items => items.id == Number(localStorage.getItem('VigSeleccionada')));
        this.nombreVigAnoSeleccionada = this.dataArray[0].nombre;
        this.dataArrayInterno = response.filter(items => items.vigenciaActual === true);
      },
      (err) => {

        this.isLoading = false;
      }
    );
    this._RepositorioCajaService.getRepositoriosCajaHerramientaList().subscribe(
      (response: any) => {

        this.RepositoriosCajaList = response
        for (let caja in this.RepositoriosCajaList) {
          this.RepositoriosCajaList[caja].extension = this.getFileExtension1(this.RepositoriosCajaList[caja].pathArchivo);
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
            for (let anex in this.RepositoriosAnexosList) {
              this.RepositoriosAnexosList[anex].CajaHerramientas = this.RepositoriosCajaList.filter(item => item.id_AnexoRecurso == this.RepositoriosAnexosList[anex].id)
              this.RepositoriosAnexosList[anex].extension = this.getFileExtension1(this.RepositoriosAnexosList[anex].pathArchivo);
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


            this.RepositoriosAnexosListCaja = this.RepositoriosAnexosList;

            this._PA_repositoriosGetAllWithRelationService.getPA_repositoriosGetAllWithRelationList(1, Number(localStorage.getItem('VigSeleccionada'))).subscribe(
              (response: any) => {

                this.RepositoriosList = response;



                for (let repositorio in this.RepositoriosList) {
                  this.RepositoriosList[repositorio].anexos = this.RepositoriosAnexosListCaja.filter(item => item.id_Repositorio == this.RepositoriosList[repositorio].id);
                  if (this.RepositoriosList[repositorio].nombreResolucion === null) {
                    this.RepositoriosList[repositorio].nombreResolucion = this.RepositoriosList[repositorio].nombre
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

                  const _fileUpload = { file: null, fileName: this.RepositoriosList[repositorio].pahtArchivo, cnx: environment.cnxBS, container: environment.containerBS };
                 
                  this.RepositoriosService.downloadFileBlobRepositorios2(_fileUpload, 'sd').subscribe(
                    (response: any) => {
  
                      // Verificamos si la respuesta es un ArrayBuffer (en vez de un Blob)
                      if (response instanceof ArrayBuffer) {
                        // Convertimos el ArrayBuffer a un Blob
                        const blob = new Blob([response], { type: this.getType2(_fileUpload.fileName) });
  
                        // Crear un objeto de tipo File a partir del Blob
                        const fileupload = new File([blob], _fileUpload.fileName, { type: this.getType2(_fileUpload.fileName) })
                        this.RepositoriosList[repositorio].pahtArchivo2=fileupload
                        
                        
                        
                      } else {
                        console.error("No se ha recibido un ArrayBuffer o Blob válido.");
                      }
                    },
                    (err) => {
                      // Manejo de errores
                      console.error("Error al descargar el archivo:", err);
                    }
                  );
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
      && filename != 'txt' && filename != 'doc' && filename != 'xls' && filename != 'png'
      && filename != 'jpg' && filename != 'gif' && filename != 'csv' && filename != 'ppt'
      && filename != 'pptx' && filename != 'json' && filename != 'webp' && filename != 'zip') { filename = 'othe' }
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
  getType2(_response: any): string {
    let fileName = _response;
    //file type extension
    let checkFileType = fileName.split('.').pop();
    
    let fileType;
    if (checkFileType == "txt") {
      fileType = "text/plain";
    }
    if (checkFileType == "pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == "doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == "docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == "xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == "ppt") {
      fileType = "application/vnd.ms-powerpoint";
    }
    if (checkFileType == "pptx") {
      fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }
    if (checkFileType == "png") {
      fileType = "image/png";
    }
    if (checkFileType == "jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == "jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == "gif") {
      fileType = "image/gif";
    }
    if (checkFileType == "csv") {
      fileType = "text/csv";
    }
    if (checkFileType == "json") {
      fileType = "application/json";
    }
    if (checkFileType == "webp") {
      fileType = "image/webp";
    }
    if (checkFileType == "zip") {
      fileType = "application/zip";
    }
    return fileType;
  }
  BuscarRecurso(BusqTitulo: any) {

    this.restartfilter();
    this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.nombreResolucion.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 || t.nombre.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 || t.descripcion.toLocaleLowerCase().indexOf(BusqTitulo) !== -1)
  }

  restartfilter(): void {
    this.RepositoriosListFilt = this.RepositoriosList;

  }
  onOrdenarpor(ordenar: any) {

    this.searchValue = '';
    if (ordenar == 1) {

      this.restartfilter();
      this.RepositoriosListFilt.sort(function (a, b) {


        return new Date(a.fechaArchivo).getTime() - new Date(b.fechaArchivo).getTime();

      });
    } else if (ordenar == 2) {
      this.restartfilter();
      this.RepositoriosListFilt.sort((firstItem, secondItem) => firstItem.publicacion - secondItem.publicacion);
    } else if (ordenar == 3) {
      this.restartfilter();
      this.RepositoriosListFilt.sort(function (a, b) {
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
    } else if (ordenar == 0) {
      this.restartfilter();
    }


  }

  onEditarRepositorio(idRepo: number) {

    this._RepositorioCajaService.getRepositoriosCajaHerramientaList().subscribe(
      (response: any) => {

        this.RepositoriosCajaList = response
        for (let caja in this.RepositoriosCajaList) {
          this.RepositoriosCajaList[caja].extension = this.getFileExtension1(this.RepositoriosCajaList[caja].pathArchivo);
          if (this.RepositoriosCajaList[caja].extension === 'xlsx') {
            this.RepositoriosCajaList[caja].imagen = 'Íconos_PAE-241.png';


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
            for (let anex in this.RepositoriosAnexosList) {
              this.RepositoriosAnexosList[anex].CajaHerramientas = this.RepositoriosCajaList.filter(item => item.id_AnexoRecurso == this.RepositoriosAnexosList[anex].id)
              this.RepositoriosAnexosList[anex].extension = this.getFileExtension1(this.RepositoriosAnexosList[anex].pathArchivo);
              if (this.RepositoriosAnexosList[anex].extension === 'xlsx') {
                this.RepositoriosAnexosList[anex].imagen = 'Íconos_PAE-241.png';


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


            this.RepositoriosAnexosListCaja = this.RepositoriosAnexosList;

            this.RepositoriosService.getRepositoriosListRelation().subscribe(
              (response: any) => {

                let reid = response.filter(item => item.idCategoria === 1)
                this.RepositoriosList = reid.filter(item => item.id === idRepo);

                for (let repositorio in this.RepositoriosList) {
                  this.RepositoriosList[repositorio].anexos = this.RepositoriosAnexosListCaja.filter(item => item.id_Repositorio == this.RepositoriosList[repositorio].id);
                  if (this.RepositoriosList[repositorio].nombreResolucion === null) {
                    this.RepositoriosList[repositorio].nombreResolucion = this.RepositoriosList[repositorio].nombre
                  }
                  this.RepositoriosList[repositorio].extension = this.getFileExtension1(this.RepositoriosList[repositorio].pahtArchivo);
                  this.RepositoriosList[repositorio].fechaArchivo = this.RepositoriosList[repositorio].fechaArchivo;
                  let fecha2 = new Date()
                  let fecha1a = new Date(this.RepositoriosList[repositorio].fechaCarga)

                  let diferncia = (fecha2.getTime() - fecha1a.getTime()) / 1000;
                  diferncia /= (60 * 60);


                  let dife = Math.abs(Math.round(diferncia));
                  this.RepositoriosList[repositorio].publicacion = dife;
                  if (this.RepositoriosList[repositorio].extension === 'xlsx') {
                    this.RepositoriosList[repositorio].imagen = 'Íconos_PAE-241.png';

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
                  const _fileUpload = { file: null, fileName: this.RepositoriosList[repositorio].pahtArchivo, cnx: environment.cnxBS, container: environment.containerBS };
               
                this.RepositoriosService.downloadFileBlobRepositorios2(_fileUpload, 'sd').subscribe(
                  (response: any) => {

                    // Verificamos si la respuesta es un ArrayBuffer (en vez de un Blob)
                    if (response instanceof ArrayBuffer) {
                      // Convertimos el ArrayBuffer a un Blob
                      const blob = new Blob([response], { type: this.getType2(_fileUpload.fileName) });

                      // Crear un objeto de tipo File a partir del Blob
                      const fileupload = new File([blob], _fileUpload.fileName, { type: this.getType2(_fileUpload.fileName) })
                      this.RepositoriosList[repositorio].pahtArchivo2=fileupload
                      
                    } else {
                      console.error("No se ha recibido un ArrayBuffer o Blob válido.");
                    }
                  },
                  (err) => {
                    // Manejo de errores
                    console.error("Error al descargar el archivo:", err);
                  }
                );
                }
               
                this.openDialog('Actualizar', this.RepositoriosList)
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

  onEliminarRepositorio(idRepo: number, pahtArchivo: any, nombre: any) {

    let anex: any;
    let Repo: any;
    let h = this.RepositoriosListFilt.filter(item => item.id === idRepo)
    anex = h[0].anexos;
    Swal.fire({

      showCloseButton: false,
      html:
        '<img style="position: absolute !important ;right: 5% !important; top:15% !important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="30px" width="auto">' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA !important; margin-top: 7%">¿Está seguro de que desea eliminar... ?</p> ' +
        '<p style="text-align: center!important; font-size: 13px; color:#005ACA;!important">(Está acción no se puede revertir) </p> ',
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#009922',
      cancelButtonColor: '#005ACA',
      denyButtonColor: '#005ACA',
      confirmButtonText: 'Aceptar Aprobaciones',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: `Aceptar`,
    }).then((result) => {
      if (result.isDenied) {
        if (anex == 0) {

          this.RepositoriosService.deleteRepositorios(idRepo, pahtArchivo, nombre).subscribe(
            (response) => {

              this.ngOnInit();
            },
            (err) => {

            });
        } else {

          anex.forEach(dato => {
            this._RepositorioCajaService.getRepositoriosCajaHerramientaListfilter(dato.id).subscribe(
              (response) => {
                Repo = [];
                Repo = response

                if (anex != 0 && Repo == 0) {
                  anex.forEach(dato => {
                    this._RepositorioAnexosService.deleteRepositoriosAnexos(dato.id, dato.nombre, dato.pathArchivo).subscribe(
                      (response) => {

                        this.RepositoriosService.deleteRepositorios(idRepo, pahtArchivo, nombre).subscribe(
                          (response) => {

                            this.ngOnInit();
                          },
                          (err) => {

                          }
                        );
                      },
                      (err) => {
                      }
                    );

                  });
                } else if (anex != 0 && Repo != 0) {
                  Repo.forEach(dato => {
                    this._RepositorioCajaService.deleteRepositoriosCajaHerramienta(dato.id, dato.pathArchivo).subscribe(
                      (response) => {


                        anex.forEach(dato => {
                          this._RepositorioAnexosService.deleteRepositoriosAnexos(dato.id, dato.nombre, dato.pathArchivo).subscribe(
                            (response) => {


                              this.RepositoriosService.deleteRepositorios(idRepo, pahtArchivo, nombre).subscribe(
                                (response) => {

                                  this.ngOnInit();
                                },
                                (err) => {

                                }
                              );
                            },
                            (err) => {

                            });
                        });

                      },
                      (err) => {

                      }
                    );

                  })
                }



              },
              (err) => {

              });

          })

        }

      }
    })

  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogRepositorioLineamientosUAPAContent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      } else if (result.event === 'Cerrar') {
        this.ngOnInit();
      }
    });
  }
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: RepositoriosExtendModel): void {
    this.ngOnInit();
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


    this.RepositoriosService.deleteRepositorios(ideliminar, row_obj.pahtArchivo, row_obj.nombreResolucion).subscribe(
      (response) => {

        this.ngOnInit();
      },
      (err) => {

      }
    );

  }
  getModulePermission(module: number, action: string): boolean {
    return this.seguridadService.getModulePermission(module, action);

  }

  Check: boolean = true;
  CambioVigencia(value: any) {



    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
        this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
        localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
        this.CambioNoVigencia();


        if (this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre) {
          this.Check = false;
        } return this.Check
      },
      (err) => {

        this.isLoading = false;
      }
    );
  }
  CambioNoVigencia() {



    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigNoSelect = response.filter(items => items.id != Number(localStorage.getItem('VigSeleccionada')));;
        localStorage.setItem('VigNoSeleccionada', this.dataArrayInternoVigNoSelect[0].id);
        window.location.reload();

        this.Check = false;

      },
      (err) => {

        this.isLoading = false;
      }
    );
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'repositorios-lineamientos-uapa.dialog.component.html',
  styleUrls: ["./repositorios-lineamientos-uapa.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogRepositorioLineamientosUAPAContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  maxfileerror: any;
  // Listas relacionales
  public CategoriasList: any = [];
  public ModeloOperadorList: any = [];
  contenidoRespuesta: string = '';
  TipoArchivoList: TipoArchivoModel[];
  VigenciasList: VigenciasModel[];
  ano: number = new Date().getFullYear();

  public viewActiva: number = 0;
  public RepositoriosObject: RepositoriosExtendModel = {
    extension: '',
    sID: 0,
    filtro: '',
    validationErrors: '',
    imagen: '',
    publicacion: 0,
    id: 0,
    idTipoArchivo: 5,
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
    fechaCarga: new Date(),
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
    completed: false,
    id_TipoModeloOperacion: 0,
    nombreResolucion: '',
    anexos: [],
    tamanoArchivo: '',
    diferenciaHoras: 0,
    pahtArchivo2: '',
  }
  private resultQuery1: boolean = false;
  private resultQuery2: boolean = false;
  mesajesalert: boolean = false;
  mesajesalert1: boolean = false;
  mesajesalert2: boolean = false;
  mesajesalert3: boolean = false;
  mesajesalert4: boolean = false;
  mesajesalert5: boolean = false;
  mesajesalert6: boolean = false;
  mesajesalert7: boolean = false;
  btnanexosDisab: boolean = true;
  btnRepositoriosDisab: boolean = true;
  constructor(public dialogRef: MatDialogRef<DialogRepositorioLineamientosUAPAContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RepositoriosExtendModel,
    private categoriasService: CategoriasService,
    public RepositoriosService: RepositoriosExtendService,
    private tipoArchivoService: TipoArchivoService,
    private vigenciasService: VigenciasService,
    private _messageService: MessageService,
    private _ModeloOperacionService: TiposModeloOperacionService,
  ) {
    this.todosLosFiltros();
    this.local_data = { ...data };
    this.action = this.local_data.action;


    this.llenarDatos(data)


    //this.router.navigate(["/inicio"]);


  }
  todosLosFiltros() {
    this.RepositoriosObject['idVigencia'] = Number(localStorage.getItem('VigSeleccionada'))
    this.categoriasService.getCategoriasList().subscribe(
      (response: any) => {


        this.CategoriasList = response.filter(item => item.id === 1);
        this.RepositoriosObject['idCategoria'] = this.CategoriasList[0].id;
      },
      (err) => {

      }

    );
    this._ModeloOperacionService.getTiposModeloOperacionList().subscribe(
      (response: any) => {

        this.ModeloOperadorList = response;
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
  }
  public onFileSelected(File: string | any[]): void {
    if (File[0]) {
      const bytes = File[0].size
      const k = 1024;
      const dm = 2 < 0 ? 0 : 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      const f = parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
      this.RepositoriosObject['tamanoArchivo'] = f;
      const fileupload = File[0] as File;
      const formData = new FormData();
      formData.append('file', fileupload);
      let nombre = fileupload.name
      nombre = nombre
        .replace(/ /g, "")             // Eliminar espacios
        .replace(/á/g, "a")            // Reemplazar tildes
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n");           // Reemplazar ñ por n
      let sinEspa = 'ReL' + nombre;
      this.RepositoriosObject['pahtArchivo2'] = fileupload;
      this.RepositoriosObject['pahtArchivo'] = sinEspa;
      this.contenidoRespuesta = sinEspa;
      this.mesajesalert7 = false;
      /* let _fileUpload: fileUploadModel;
      _fileUpload = { file: formData, fileName: fileupload.name, cnx: environment.cnxBS, container: environment.containerBS };
      this.addFileBlobRepositorios(_fileUpload);*/
    }
  }


  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        this.RepositoriosObject['pahtArchivo'] = String.fromCharCode.apply(null, new Uint8Array(response));
        //this.form.controls['pahtArchivo'].setValue(String.fromCharCode.apply(null,new Uint8Array(response)));
        this.contenidoRespuesta = String.fromCharCode.apply(null, new Uint8Array(response));
        this.mesajesalert7 = false;
      },
      (err) => {
      }
    );
  }
  mensajeOut() {
    this.maxfileerror = false;
  }
  onSubmit(): void {

    switch (this.viewActiva) {
      case 0:

        if (this.RepositoriosObject.id === 0) {
          this.crearRepositorio();
          this.viewActiva = 1;
        } else {

          this.actualizarRepositorio();
        }
        break;

      case 1:
        this.avanzar();
        break;
    }
  }
  mensaje() {
    alert('emtro aqui')
  }
  crearRepositorio() {

    if (this.RepositoriosObject.nombre == '' || this.RepositoriosObject.id_TipoModeloOperacion == 0 || this.RepositoriosObject.nombreResolucion == '' || this.RepositoriosObject.descripcion == '' || this.RepositoriosObject.fechaArchivo == undefined || this.RepositoriosObject.pahtArchivo == '') {
      Swal.fire({
        showCloseButton: true,
        html:
          '<img style="float: right;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png" height="50px" width="auto">' +
          '<p style="text-align: left!important; font-size: 12px; color:#005ACA;">Debe diligenciar todos los campos del </p> ' +
          '<p style="text-align: left!important; font-size: 12px; color:#005ACA;"> formulario para poder continuar</p> ',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: '#009922',
        cancelButtonColor: '#FF0000',
        denyButtonColor: '#009922',
        confirmButtonText: 'Aceptar Aprobaciones',
        cancelButtonText: 'Cancelar',
        showDenyButton: false,
        denyButtonText: `Aceptar`,
      }).then((result) => {

        let valid: boolean = this.validar(this.RepositoriosObject);
        if (valid) {
          this.mesajesalert = false;
          this.mesajesalert2 = false;
          this.mesajesalert3 = false;
          this.mesajesalert4 = false;
          this.mesajesalert5 = false;
          this.mesajesalert6 = false;
          this.mesajesalert7 = false;


          if (this.RepositoriosObject.id != 0) {
            this.RepositoriosService.updateRepositorios(this.RepositoriosObject)
              .subscribe(async (response) => {
                if (response.id != 0) {
                  await this.saveArchivo(this.RepositoriosObject);
                  this.resultQuery1 = true;
                  this.avanzar();
                } else {
                  this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
                }

              },
                (err) => {
                });
          }
          else if (this.RepositoriosObject.id == 0) {
            this.RepositoriosService.addRepositoriosE(this.RepositoriosObject).subscribe(
              async (response) => {
                if (response.id != 0) {
                  this.RepositoriosObject.id = response.id;
                  await this.saveArchivo(this.RepositoriosObject);
                  this.resultQuery1 = true;
                  this.viewActiva = 0
                  this.avanzar();
                } else {
                  this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
                }

              },
              (err) => {
              }
            );
          }
        }

      })


    }

    else {


      let valid: boolean = this.validar(this.RepositoriosObject);
      if (valid) {
        this.mesajesalert = false;
        this.mesajesalert2 = false;
        this.mesajesalert3 = false;
        this.mesajesalert4 = false;

        if (this.RepositoriosObject.id != 0) {
          this.RepositoriosService.updateRepositorios(this.RepositoriosObject)
            .subscribe(async (response) => {

              if (response.id != 0) {
                await this.saveArchivo(this.RepositoriosObject);

                this.resultQuery1 = true;

                this.avanzar();
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
              (err) => {
              });
        }
        else if (this.RepositoriosObject.id == 0) {
          this.RepositoriosService.addRepositoriosE(this.RepositoriosObject).subscribe(
            async (response) => {
              if (response.id != 0) {
                this.RepositoriosObject.id = response.id;
                await this.saveArchivo(this.RepositoriosObject);
                this.resultQuery1 = true;
                this.viewActiva = 0
                this.avanzar();
              } else {
                this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
              }

            },
            (err) => {
            }
          );
        }
      }
    }



  }

  async saveArchivo(response: any): Promise<void> {
    console.log(response.pahtArchivo2);
    
    // Verificar si pahtArchivo tiene un valor válido antes de proceder
    if (typeof response.pahtArchivo === 'string' && response.pahtArchivo !== 'NaN') {
      const fileName = response.pahtArchivo;
      const formData = new FormData();
      formData.append('file', response.pahtArchivo2);

      let nombre = response.id + fileName;
      response.pahtArchivo = nombre;

      let _fileUpload: fileUploadModel = {
        file: formData,
        fileName: nombre,
        cnx: environment.cnxBS,
        container: environment.containerBS
      };
       this.addFileBlobRepositorios(_fileUpload)

      await this.actualizarRepositorio2();

    } else {
      console.error('Valor inválido para pahtArchivo:', response.pahtArchivo);
    }
  }
  async saveArchivo2(response: any): Promise<void> {
    console.log(1383, response, this.data[0].pahtArchivo2);
    
      const formData = new FormData();
      formData.append('file', this.data[0].pahtArchivo2);
      let _fileUpload: fileUploadModel = {
        file: formData,
        fileName: response.pahtArchivo,
        cnx: environment.cnxBS,
        container: environment.containerBS
      };
      this.addFileBlobRepositorios(_fileUpload)

      this.actualizarRepositorio2();

  }
  validar(itemIndex: any) {

    if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el resolucion
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el descrip
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el fecha
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el archivo
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el archivo
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre y modelo
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre y resol
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre y descripcion
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre y fecha
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre y archivo
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 && itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo y reso
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo y des
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo yfec
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el modelo yarc
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el res y des
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el res y fech
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el res y fech
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el des y fech
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el des y arc
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 && itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el des y arc
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nom, mode, res
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nom, mode, des
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nom, mode, fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nom, mode, arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nom, res, des
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nom, res, fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nom, res, arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nom, des, fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nom, des, arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nom, fac, arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo, res, des
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo, res, fec
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el modelo, res, archi
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el modelo, des, fec
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el modelo, des, archi
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el modelo, fec, archi
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el reso,des,fec
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el reso,des,fec
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el reso,des,fec
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el des,fec,arc
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre, modelo,res,des
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre, modelo,res,fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre, modelo,res,arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre, modelo,des,fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre, modelo,des,arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre, modelo,fech, arch
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el nombre, res,des, fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }

    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre, res,des, arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre, res,arc, pah
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el nombre, des,arc, pah
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //todos les falta menos el mod, res,des, fec
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el mod, des,fec,arc
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el mod, res,fec,arc
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //todos les falta menos el res,des,fec,arc
      this.mesajesalert2 = true;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo == '') {
      //les falta solo arc
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = true;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo == undefined && itemIndex.pahtArchivo != '') {
      //les falta solo fec
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = true;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion == '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //les falta solo des
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = true;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion == '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //les falta solo res
      this.mesajesalert2 = false;
      this.mesajesalert3 = false;
      this.mesajesalert4 = true;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre != '' && itemIndex.id_TipoModeloOperacion == 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //les falta solo mod
      this.mesajesalert2 = false;
      this.mesajesalert3 = true;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }
    else if (itemIndex.nombre == '' && itemIndex.id_TipoModeloOperacion != 0 &&
      itemIndex.nombreResolucion != '' && itemIndex.descripcion != '' && itemIndex.fechaArchivo != undefined && itemIndex.pahtArchivo != '') {
      //les falta solo nom
      this.mesajesalert2 = true;
      this.mesajesalert3 = false;
      this.mesajesalert4 = false;
      this.mesajesalert5 = false;
      this.mesajesalert6 = false;
      this.mesajesalert7 = false;
      return false;
    }

    return true;

  }
  actualizarRepositorio() {
    this.RepositoriosService.updateRepositorios(this.RepositoriosObject)
      .subscribe(async (response) => {
        if (response.id != 0) {
          await this.saveArchivo2(this.RepositoriosObject);
          this.resultQuery1 = true;
          this.avanzar();
        } else {
          this._messageService.showError('ERROR: El numero de repositorio ya existe ', 'top center');
        }

      },
        (err) => {
        });

  }
  actualizarRepositorio2() {
    this.RepositoriosService.updateRepositorios(this.RepositoriosObject)
      .subscribe((response) => {


      },
        (err) => {
        });

  }
  avanzar() {
    switch (this.viewActiva) {
      case 0:
        if (this.resultQuery1) {
          this.resetQuery();
          this.set_ViewActiva(1);

        }
        return;

      case 1:
        if (this.resultQuery1) {
          this.resetQuery();
          this.finalizar();
        }
        return;
    }
  }
  set_ViewActiva(viewActiva: number) {
    this.viewActiva = viewActiva;

  }
  resetQuery() {
    this.resultQuery1 = false;
    this.resultQuery2 = false;
  }
  finalizar() {
    this.dialogRef.close({ event: this.action, data: this.RepositoriosObject });
  }
  anexosServicio(disabled: boolean) {

    this.btnanexosDisab = disabled;
  }
  changeItemNombre(name: string, value: any) {
    this.RepositoriosObject[name] = value;
    this.mesajesalert2 = false;

  }
  changeItemOpe(name: string, value: any) {
    this.RepositoriosObject[name] = value;
    this.mesajesalert3 = false;

  }
  changeItemRe(name: string, value: any) {
    this.RepositoriosObject[name] = value;
    this.mesajesalert4 = false;

  }
  changeItemDes(name: string, value: any) {
    this.RepositoriosObject[name] = value;
    this.mesajesalert5 = false;

  }
  changeItemFec(name: string, value: any) {
    this.RepositoriosObject[name] = value;
    this.mesajesalert6 = false;

  }

  llenarDatos(data: any) {
    console.log('2144',data);
    
    if (this.action === 'Actualizar') {
      this.RepositoriosObject.nombre = data[0].nombre;
      this.RepositoriosObject.idTipoArchivo = data[0].idTipoArchivo;
      this.RepositoriosObject.idCategoria = data[0].idCategoria;
      this.RepositoriosObject.id_TipoModeloOperacion = data[0].id_TipoModeloOperacion;
      this.RepositoriosObject.nombreResolucion = data[0].nombreResolucion;
      this.RepositoriosObject.descripcion = data[0].descripcion;
      this.RepositoriosObject.fechaArchivo = data[0].fechaArchivo;
      this.RepositoriosObject.pahtArchivo = data[0].pahtArchivo;
      this.RepositoriosObject.pahtArchivo2 = data[0].pahtArchivo2;
      this.contenidoRespuesta = data[0].pahtArchivo;
      this.RepositoriosObject.id= data[0].id;
      this.RepositoriosObject.tamanoArchivo = data[0].tamanoArchivo;
      this.btnanexosDisab = false;
    }
    console.log('2178',this.RepositoriosObject);

  }
  closeDialog(): void {
    if (this.action == 'Adicionar') {
      this.action = 'Cerrar'
      this.dialogRef.close({ event: 'Cerrar' });
    } else if (this.action == 'Actualizar') {
      this.action = 'Cerrar'
      this.dialogRef.close({ event: 'Cerrar' });
    }

  }

}
