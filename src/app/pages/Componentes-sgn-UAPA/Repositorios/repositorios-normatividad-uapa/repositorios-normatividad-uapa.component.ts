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
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Router } from '@angular/router';
import { PA_repositoriosGetAllWithRelationService } from 'src/app/shared/services/PA_repositoriosGetAllWithRelation.services';
@Component({
  selector: 'app-repositorios-normatividad-uapa',
  templateUrl: './repositorios-normatividad-uapa.component.html',
  styleUrls: ['./repositorios-normatividad-uapa.component.scss']
})
export class RepositoriosNormatividadUapaComponent implements OnInit, AfterViewInit, OnDestroy {

  RepositoriosList: RepositoriosExtendModel[] = [];
  fechaConv: any;
  RepositoriosListFilt: RepositoriosExtendModel[] = [];
  selectedCategory = '0';
  searchValue:string = '';
  private subs = new Subscription();
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
    completed: false,
    id_TipoModeloOperacion: 1,
    nombreResolucion: '',
    anexos: [],
    tamanoArchivo: '',
    diferenciaHoras: 0,
    pahtArchivo2: []
  }
  public nombreUbicacion = 'UApA | Repositorio';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();

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

  public dataArrayInterno: any;
  public dataArray: any;
  isLoading = true;

  constructor(private RepositoriosService: RepositoriosExtendService, public dialog: MatDialog, 
    public fechaPi: DatePipe,private seguridadService:SeguridadService,private router: Router,
    public VigenciasServicio: VigenciasService,
    private _PA_repositoriosGetAllWithRelationService :PA_repositoriosGetAllWithRelationService,
    ) { this.fechaConv = fechaPi;
  
    }

    ngOnInit(): void {
      this.VigenciasServicio.getVigenciasList().subscribe(
        (response: any) => {
  
          this.dataArray = response.filter(items => items.id == Number(localStorage.getItem('VigSeleccionada')));
          this.nombreVigAnoSeleccionada = this.dataArray[0] .nombre;
          this.dataArrayInterno = response.filter(items => items.vigenciaActual === true);
  
  
        },
        (err) => {
          this.isLoading = false;
        }
      );
      this._PA_repositoriosGetAllWithRelationService.getPA_repositoriosGetAllWithRelationList(5,Number(localStorage.getItem('VigSeleccionada'))).subscribe(
        (response: any) => {

                this.RepositoriosList = response;
         
          for (let repositorio in this.RepositoriosList) {
            this.RepositoriosList[repositorio].extension = this.getFileExtension1(this.RepositoriosList[repositorio].pahtArchivo);
            this.RepositoriosList[repositorio].fechaArchivo = this.RepositoriosList[repositorio].fechaArchivo;
            let fecha2 = new Date()
            let fecha1a = new Date(this.RepositoriosList[repositorio].fechaCarga)
            let diferncia = (fecha2.getTime() - fecha1a.getTime()) / 1000;
            diferncia /= (60 * 60);
            
            let dife= Math.abs(Math.round(diferncia));
            this.RepositoriosList[repositorio].publicacion = this.RepositoriosList[repositorio].diferenciaHoras;
            if(this.RepositoriosList[repositorio].extension ==='xlsx'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-241.png';
             // this.RepositoriosListFilt.push('Íconos_PAE-241.png')
  
            }else if(this.RepositoriosList[repositorio].extension ==='pdf'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-244.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='txt'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-248.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='doc'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-242.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='docx'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-242.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='xls'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-241.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='png'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-249.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='jpg'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-250.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='jpeg'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-251.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='gif'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-252.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='csv'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-253.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='json'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-254.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='webp'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-255.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='ppt'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-243.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='pptx'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-243.png';
            }
            else if(this.RepositoriosList[repositorio].extension ==='zip'){
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-245.png';
            }
            else{
              this.RepositoriosList[repositorio].imagen='Íconos_PAE-256.png';
            }
  
            //formatear la fecha
          }
          
          
          this.RepositoriosListFilt = this.RepositoriosList;
          
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
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t =>  t.nombre.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 || t.descripcion.toLocaleLowerCase().indexOf(BusqTitulo) !== -1 )
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
      const dialogRef = this.dialog.open(DialogRepositorioNormatividadUAPAContent, {
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
    this.RepositoriosObject.idVigencia=Number(localStorage.getItem('VigSeleccionada'));
    this.RepositoriosObject.pahtArchivo=row_obj.pahtArchivo;
    this.RepositoriosObject.nombre=row_obj.nombre;
    this.RepositoriosObject.tamanoArchivo=row_obj.tamanoArchivo;
      this.RepositoriosService.addRepositoriosE(this.RepositoriosObject).subscribe(
        async (response) => {
          row_obj.id = response.id;
        await this.saveArchivo(row_obj);
          await this.ngOnInit();
        },
        (err) => {
        }
      );
    }
    async saveArchivo(response: any): Promise<void> {
 
      // Verificar si pahtArchivo tiene un valor válido antes de proceder
      if (typeof response.pahtArchivo === 'string' && response.pahtArchivo !== 'NaN') {
        const fileName = response.pahtArchivo;
        const formData = new FormData();
        formData.append('file', response.pahtArchivo2);
  
        let nombre = response.id + fileName;
        response.pahtArchivo = nombre;
        response.idTipoArchivo = 5;
        let _fileUpload: fileUploadModel = {
          file: formData,
          fileName: nombre,
          cnx: environment.cnxBS,
          container: environment.containerBS
        };
  
        this.RepositoriosService.addFileBlobRepositorios(_fileUpload).subscribe(
          (resp: any) => {
            console.log('Archivo subido correctamente:', resp);
          },
          (err) => {
            console.error('Error al subir archivo:', err);
          }
        );
  
        await this.updateRowData(response);
      
      } else {
        console.error('Valor inválido para pahtArchivo:', response.pahtArchivo);
      }
    }
    // tslint:disable-next-line - Disables all
    updateRowData(row_obj: RepositoriosExtendModel): boolean | any {
      row_obj.id_TipoModeloOperacion=1;
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
    
  Check: boolean = true;
  CambioVigencia(value: any) {


    this.VigenciasServicio.getVigenciasList().subscribe(
      (response: any) => {

        this.dataArrayInternoVigSelect = response.filter(items => items.id == value.target.value);
        this.nombreVigAnoSeleccionada = this.dataArrayInternoVigSelect[0].nombre;
        localStorage.setItem('VigSeleccionada', this.dataArrayInternoVigSelect[0].id);
        this.CambioNoVigencia();

        if(this.dataArrayInternoVigSelect != this.dataArrayInternoVigSelect[0].nombre){
          this.Check = false;
        }return this.Check
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
  templateUrl: 'repositorios-normatividad-uapa.dialog.component.html',
  styleUrls: ["./repositorios-normatividad-uapa.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogRepositorioNormatividadUAPAContent {
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
  fechaA:any;
  pipe = new DatePipe('en-US');
  ano: number = new Date().getFullYear();
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
    pahtArchivo2: []
  }
  constructor(public dialogRef: MatDialogRef<DialogRepositorioNormatividadUAPAContent>,
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
      pahtArchivo2: [],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      auditoria: [''],
      fechaArchivo: [data.fechaArchivo, Validators.required],
      fechaCarga: [new Date()],
      sidCategoria: [data.sidCategoria],
      sidVigencia: [data.sidVigencia],
      tamanoArchivo:[data.tamanoArchivo],

    });
    this.todosLosFiltros();


    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.fechaA= this.pipe.transform(data.fechaArchivo, 'yyyy-MM-dd');
    if(this.action == 'Actualizar'){
      this.contenidoRespuesta=data.pahtArchivo;
    }
  }
  todosLosFiltros(){
    this.categoriasService.getCategoriasList().subscribe(
      (response: any) => {
        this.CategoriasList = response.filter(item => item.id === 5);
        this.RepositoriosObject['idCategoria'] = this.CategoriasList[0].id;
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
      const bytes=File[0].size
      const k = 1024;
      const dm = 2 < 0 ? 0 :2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
      const i = Math.floor(Math.log(bytes) / Math.log(k));
  
      const f= parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
      this.form.controls['tamanoArchivo'].setValue(f);
      const fileupload = File[0] as File ;
      const formData = new FormData();
      formData.append('file',fileupload);
      let nombre = fileupload.name
      nombre = nombre
        .replace(/ /g, "")             // Eliminar espacios
        .replace(/á/g, "a")            // Reemplazar tildes
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n");           // Reemplazar ñ por n
      let sinEspa = 'ReN' + nombre;
      this.form.controls['pahtArchivo2'].setValue(fileupload);
      this.form.controls['pahtArchivo'].setValue(sinEspa);
        this.contenidoRespuesta=sinEspa;
      /* let _fileUpload : fileUploadModel;
       _fileUpload = {file:formData, fileName:fileupload.name, cnx:environment.cnxBS, container:environment.containerBS};
        this.addFileBlobRepositorios(_fileUpload); */
  }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  onfecha(value:any){
    this.form.controls['fechaArchivo'].setValue(value);
  }
  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
        
      },
      (err) => {
      }
    );
  }
  mensajeOut() {
    this.maxfileerror = false;
  }

}