import {
  Component, OnInit, Inject, Optional, ViewChild, OnDestroy, AfterViewInit, Pipe, ElementRef
} from '@angular/core';
import { interval, Subject, Subscription } from "rxjs";
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// objetos del modelo requerido
import { RepositoriosExtendModel } from 'src/app/shared/model/Repositorios-Extend';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';

/// variables de entorno global
import { environment } from "src/environments/environment";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

/// objetos relacionaes --> llamada de servicios y modelos
import { CategoriasModel } from 'src/app/shared/model/Categorias';
import { CategoriasService } from 'src/app/shared/services/Categorias.services';
import { TipoArchivoModel } from 'src/app/shared/model/TipoArchivo';
import { TipoArchivoService } from 'src/app/shared/services/TipoArchivo.services';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';



import { DatePipe } from '@angular/common';

import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { Guid } from 'guid-typescript';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';




const URL = 'api/Repositorios/Post';

@Component({
  selector: "app-list-Repositorios-Extend",
  templateUrl: "./list-Repositorios-Extend.component.html",
  styleUrls: ["./list-Repositorios-Extend.component.scss"],
})

export class ListRepositoriosExtendComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);

  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;
  isLoading = true;
  private apiurl = environment.baseUrlAPI + "Repositorios";
  RepositoriosDetail: RepositoriosExtendModel | null = null;
  RepositoriosList: RepositoriosExtendModel[] = [];
  RepositoriosListFilt: RepositoriosExtendModel[] = [];
  ResponseRepositorio: RepositoriosExtendModel | null = null;
  searchValue:string = '';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  nombreETC = environment.nameETC;

  private dataArray: any;
  displayedColumns: string[] = ['select', "id", "idTipoArchivo", "sidTipoArchivo", "idCategoria", "sidCategoria", "idVigencia", "sidVigencia", "pAHTArchivo", "nombre", "descripcion", "auditoria", "fechaArchivo", "fechaCarga", 'action'];
  public dataSource!: MatTableDataSource<RepositoriosExtendModel>;
  selection = new SelectionModel<RepositoriosExtendModel>(true, []);

  selectedCategory = '0';
  filename: string = "";
  selBus="";
  seMuestra = false;
  filterValue: string;
  fechaConsulta: Date = new Date();
  fechaPipe: any;
  fechaConv: any;
  blob: Blob;
  dataBusq = document.getElementById('idBusqueda');
  xlsx:string;
  imagen:string;

  constructor(
    public dialog: MatDialog,
    public RepositoriosService: RepositoriosExtendService,
    public fechaPi: DatePipe,
    private seguridadService:SeguridadService,) {
    this.ngOnInit;
    this.filename = "";
    this.fechaPipe = fechaPi;
    this.fechaConv = fechaPi;
    let _fileUpload: fileUploadModel;

  }

  ngOnInit(): void {

    this.RepositoriosService.getRepositoriosListRelation().subscribe(
      (response: any) => {

        this.RepositoriosList = response;
        for (let repositorio in this.RepositoriosList) {
          this.RepositoriosList[repositorio].extension = this.getFileExtension1(this.RepositoriosList[repositorio].pahtArchivo);
          this.RepositoriosList[repositorio].fechaArchivo = this.fechaConv.transform(this.RepositoriosList[repositorio].fechaArchivo, 'yyyy-MM-dd')
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
        }


        this.RepositoriosListFilt = this.RepositoriosList;


      },
      (err) => {
        console.log("-----> error en cargar los registros", err);
      }
    );
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
        console.log("-----> error en la descarga del archivo desde el repositorio azure", err);
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


  getFileExtension1(filename: string) {
    filename = filename.substring(filename.lastIndexOf('.') + 1);
    if (filename != 'pdf' && filename != 'pptx' && filename != 'docx' && filename != 'xlsx'
    && filename != 'txt' && filename != 'doc'&& filename != 'xls'&& filename != 'png'
    && filename != 'jpg' && filename != 'gif'&& filename != 'csv'&& filename != 'ppt'
    && filename != 'pptx'&& filename != 'json'&& filename != 'webp'&& filename != 'zip') { filename = 'othe' }
    return (filename);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
  }
  palabrabusq:string=''
  applyFilter(filterV: any): void {
    // console.log('filtro',filterV);
    this.palabrabusq=filterV;
    // console.log('ava',this.filterValue);
    if(this.filterValue == undefined){
      this.restartfilter();
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.nombre.toLocaleLowerCase().indexOf(filterV) !== -1)
    }else{
      switch (this.filterValue) {
        case '0':
          if (filterV != '') {
            this.restartfilter();

            this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.nombre.toLocaleLowerCase().indexOf(filterV) !== -1)
          }
          else {
            this.palabrabusq='';
            this.restartfilter();
          }
          break;

        case 'titulo':
          if (filterV != '') {


            this.restartfilter();
            //this.searchValue = null;
            this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.nombre.toLocaleLowerCase().indexOf(filterV) !== -1)
          }
          else {
            this.restartfilter();
          }
          break;
        case 'descripcion':
          if (filterV != '') {

           this.restartfilter();
            this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.descripcion.toLocaleLowerCase().indexOf(filterV) !== -1)
          }
          else {
            this.restartfilter();
          }
          break;
        case 'fecha':
          if (filterV) {
            const ConvertDate = this.fechaPipe.transform(filterV, 'yyyy-MM-dd');

            this.restartfilter();
            this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.fechaArchivo.toString().toLocaleLowerCase().indexOf(ConvertDate) !== -1)
            // console.log(this.RepositoriosListFilt);

          }
          else {
            this.restartfilter();
          }
          break;
        case 'categoria':
          if (filterV != '') {

           this.restartfilter();
            this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.sidCategoria.toString().toLocaleLowerCase().indexOf(filterV) !== -1)
          }
          else {
            this.restartfilter();
          }
          break;
        case 'Vigencia':
          if (filterV != '') {

            this.restartfilter();
            this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.sidVigencia.toString().toLocaleLowerCase().indexOf(filterV) !== -1)
          }
          else {
            this.restartfilter();
          }
          break;
      }
    }

  }
  ddlChange(ob: any): void {
    console.log(ob);

    this.restartfilter();
    this.filterValue = ob;
    // console.log('filtro avanzado',this.filterValue);
    if (ob === 'fecha') {
      this.seMuestra = true;
      // console.log(this.seMuestra);
      this.searchValue='';
    } else if(ob==='titulo'){
      this.seMuestra = false;
      this.restartfilter();
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.nombre.toLocaleLowerCase().indexOf(this.palabrabusq) !== -1)
    }
    else if(ob==='descripcion'){
      this.seMuestra = false;
      this.restartfilter();
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.descripcion.toLocaleLowerCase().indexOf(this.palabrabusq) !== -1)
    }
    else if(ob==='categoria'){
      this.seMuestra = false;
      this.restartfilter();
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.sidCategoria.toString().toLocaleLowerCase().indexOf(this.palabrabusq) !== -1)
    }
    else if(ob==='Vigencia'){
      this.seMuestra = false;
      this.restartfilter();
      this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.sidVigencia.toString().toLocaleLowerCase().indexOf(this.palabrabusq) !== -1)
    }
    else if(ob==='0'){
      this.seMuestra = false;
      this.searchValue='';
    }
    else  {
      this.seMuestra = false;
    }

  }


  aplicarfiltrofecha(filterV: any): void {

    const ConvertDate = this.fechaPipe.transform(filterV, 'yyyy-MM-dd');
    this.restartfilter();
    this.RepositoriosListFilt = this.RepositoriosListFilt.filter(t => t.fechaArchivo.toString().toLocaleLowerCase().indexOf(ConvertDate) !== -1)
    console.log(this.RepositoriosListFilt);
  }

  restartfilter(): void {
    this.RepositoriosListFilt = this.RepositoriosList;

  }

  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;

  }
  getModulePermission(module:number,action:string):boolean{
    return this.seguridadService.getModulePermission(module,action);

  }
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogRepositoriosExtendContent, {
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
    this.RepositoriosService.addRepositoriosE(row_obj).subscribe(
      (response) => {
        this.ResponseRepositorio = response;
        console.log('Registro creado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se puedom insertar' + err);
      }
    );
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: RepositoriosExtendModel): boolean | any {
    this.RepositoriosService.updateRepositorios(row_obj).subscribe(
      (response) => {
        console.log('Registro actualizado satisfactoriamente');
        this.ngOnInit();
      },
      (err) => {
        console.log('No se puedom actualizar' + err);
      }
    );
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: RepositoriosExtendModel): boolean | any {
    const ideliminar = row_obj.id;

    this.RepositoriosService.deleteRepositorios(ideliminar,row_obj.pahtArchivo,row_obj.nombreResolucion).subscribe(
      (response) => {
        console.log("Registro Eliminado Satisfactoriamente");
        this.ngOnInit();
      },
      (err) => {
        console.log(
          "No fue posible eliminar el registro, es posible que tenga dependencias hijas: <br>" +
          err
        );
      }
    );

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'dialog-content',
  templateUrl: 'list-Repositorios-Extend.dialog.component.html',
  styleUrls: ["./list-Repositorios-Extend.dialog.component.scss"],
})
// tslint:disable-next-line - Disables all
export class DialogRepositoriosExtendContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  // instancia del formulario
  form: FormGroup;

  // Listas relacionales
  CategoriasList: CategoriasModel[];
  TipoArchivoList: TipoArchivoModel[];
  VigenciasList: VigenciasModel[];
  maxfileerror: any;
  fechaHoy = new Date();
  fileupload: any;
  tieneArchivo: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogRepositoriosExtendContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RepositoriosExtendModel,
    private fb: FormBuilder
    , private categoriasService: CategoriasService
    , private tipoArchivoService: TipoArchivoService
    , private vigenciasService: VigenciasService
    , public RepositoriosService: RepositoriosExtendService

  ) {

    this.categoriasService.getCategoriasList().subscribe(
      (response: any) => {
        this.CategoriasList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las Categorias", err);
      }

    );
    this.tipoArchivoService.getTipoArchivoList().subscribe(
      (response: any) => {
        this.TipoArchivoList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las TipoArchivo", err);
      }
    );
    this.vigenciasService.getVigenciasList().subscribe(
      (response: any) => {
        this.VigenciasList = response;
      },
      (err) => {
        console.log("Error al cargar los registros del selected de las Vigencias", err);
      }
    );


    this.form = this.fb.group({
      id: [data.id],
      idTipoArchivo: [data.idTipoArchivo, Validators.required],
      idCategoria: [data.idCategoria, Validators.required],
      idVigencia: [data.idVigencia, Validators.required],
      pahtArchivo: [data.pahtArchivo],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      auditoria: [''],
      fechaArchivo: [data.fechaArchivo, Validators.required],
      fechaCarga: [this.fechaHoy],
      sidCategoria: [data.sidCategoria],
      sidVigencia: [data.sidVigencia],

    });



    this.local_data = { ...data };
    this.action = this.local_data.action;

  }


  public onFileSelected(File: string | any[]): void {
    if (File[0]) {
      this.tieneArchivo = true;
      this.fileupload = File[0] as File;
    }
    else {
      this.tieneArchivo = false;
    }
  }


  doAction(): void {
    if (!this.tieneArchivo) {
      Swal.fire({
        title: 'Información',
        icon: 'info',
        html:
          'Debes seleccionar un archivo para cargar',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          'Gracias',
        confirmButtonAriaLabel: '',
        cancelButtonText:
          '',
        cancelButtonAriaLabel: ''
      })
    }
    else {
      const formData = new FormData();
      formData.append('file', this.fileupload);
      let _fileUpload: fileUploadModel;
      let nombrerepo = Guid.create().toString();
      nombrerepo = nombrerepo + '.' + this.fileupload.name.split('.').pop();
      _fileUpload = { file: formData, fileName: nombrerepo, cnx: environment.cnxBS, container: environment.containerBS };
      this.addFileBlobRepositorios(_fileUpload);
      this.form.controls['pahtArchivo'].setValue(nombrerepo);
      this.dialogRef.close({ event: this.action, data: this.form.value });
      this.tieneArchivo = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  addFileBlobRepositorios(fileUpload): void {
    this.RepositoriosService.addFileBlobRepositorios(fileUpload).subscribe(
      (response: any) => {
      },
      (err) => {
        console.log("-----> error ", err);
      }
    );
  }

}

