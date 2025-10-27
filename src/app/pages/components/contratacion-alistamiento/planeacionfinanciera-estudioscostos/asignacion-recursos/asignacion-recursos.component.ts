import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ColumnMode } from '@swimlane/ngx-datatable';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AsignacionRecursosApiService  } from '../../../../../shared/services/asignacion-recursos-api.service';
import { MasterDataApiService  } from '../../../../../shared/services/master-data-api.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';


@Component({
  selector: 'app-asignacion-recursos',
  /* providers: [
    AsignacionRecursosApiService,
    MasterDataApiService,
  ], */
  templateUrl: './asignacion-recursos.component.html',
  styleUrls: ['./asignacion-recursos.component.scss']
})

export class AsignacionRecursosComponent implements OnInit,OnDestroy {

  dataTabla: any[] = [];
  itemsPerPages: number[] = [5, 10, 50, 100];
  itemCant: number = 10;
  itemIni: number = 0;
  itemFin: number = 0;
  pages: number = 0;
  page: number = 0;
  disabledFirstPage: boolean = true;
  disabledPreviousPage: boolean = true;
  disabledNextPage: boolean = true;
  disabledLastPage: boolean = true;

  permisos = {
    agregar: false,
    editar: false,
    eliminar: false
  }


  loadingVisible: boolean = false;
  ColumnMode = ColumnMode;

  myForm: FormGroup = new FormGroup({});

  get idFuenteRecurso(){
    return this.myForm.get('idFuenteRecurso');
  }
  get iD_FuenteIngreso(){
    return this.myForm.get('iD_FuenteIngreso');
  }
  get nombreResolucion(){
    return this.myForm.get('nombreResolucion');
  }
  get valorPresupuestal(){
    return this.myForm.get('valorPresupuestal');
  }
  get archivoResolucion(){
    return this.myForm.get('archivoResolucion');
  }

  itemVigencia = JSON.parse(localStorage.getItem('VigSeleccionadaJson'));
  idVigencia: number = this.itemVigencia?.id;

  itemSelect: any = { id: 0, nombre: 'Elija una opción'};
  dataSource : any[] = [];
  dataSourceETC : any;
  elementResolucion: any;

  listFuentesRecursos: any;
  listFuenteIngresos: any;
  listETC : any;

  idSearch: number = 0;
  modo : number = 0;
  idEstadoResolucion: number = 0;
  entity : any;
  sumatoriaETC : number = 0;
  nombreResolucionTexto: string = '';
  disabled: boolean = false;
  fileName: string = '';
  srcPDF: any;
  indETC: number = 0;
  private subs = new Subscription() 
  displayColumnsAsignacion: any[] = [
    {name: 'Fuente', cellClass: 'text-center'},
    {name: 'Tipo', cellClass: 'text-center', maxWidth: 150},
    {name: 'Nombre', cellClass: 'text-center'},
    {name: 'Valor', cellClass: 'text-center', maxWidth: 150},
    {name: 'Estado', cellClass: 'text-center', maxWidth: 150},
  ];

  displayedColumns: string[] = ['fuente', 'tipo', 'nombre', 'valor', 'estado'];
  displayedColumnsETC: string[] = ['id', 'valor'];

  closeResult = '';

  gridVisible = true;
  formVisible = false;

  constructor(
    private _modalService: NgbModal,
    private _asignacionRecursosApiService : AsignacionRecursosApiService,
    private _masterDataApiService : MasterDataApiService,
    private _seguridadService: SeguridadService
  ) { }

  ngOnInit(){
    const idModulo = 10;
    this.permisos.agregar = this._seguridadService.getModulePermission(idModulo, 'crear');
    this.permisos.editar = this._seguridadService.getModulePermission(idModulo, 'editar');
    this.permisos.eliminar = this._seguridadService.getModulePermission(idModulo, 'eliminar');

    this.get_AsignacionRecursos();
    this.get_ETCs();
    this.get_FuentesFinanciacion();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  
  changeCantItems(value: any){
    this.itemCant = value;
    this.pages = Math.ceil(this.dataSource.length / value);
    this.page = this.dataSource.length > 0 ? 1 : 0;

    this.changePageInfo();
  }

  changePageInfo(){
    this.dataTabla = [];
    this.disabledFirstPage = true;
    this.disabledPreviousPage = true;
    this.disabledNextPage = true;
    this.disabledLastPage = true;

    if(this.page > 0){
      this.itemIni = ((this.page - 1) * this.itemCant) + 1;
      this.itemFin = this.page * this.itemCant;
      if(this.itemFin > this.dataSource.length){
        this.itemFin = this.dataSource.length;
      }

      for(let i = this.itemIni - 1; i < this.itemFin; i++){
        this.dataTabla.push(this.dataSource[i]);
      }

      if(this.page > 1){
        this.disabledFirstPage = false;
        this.disabledPreviousPage = false;
      }

      if(this.page < this.pages){
        this.disabledNextPage = false;
        this.disabledLastPage = false;
      }

    }
    else{
      this.itemIni = 0;
      this.itemFin = 0;
    }
  }

  changePage(tipo: number, page: number, disabled: boolean){
    if(!disabled){
      if(tipo == 1){
        this.page = page > 0 ? Math.ceil(this.dataSource.length / this.itemCant) : 1;
        this.changePageInfo();
      }
      else if(tipo == 2){
        this.page += page > 0 ? 1 : -1;
        this.changePageInfo();
      }
    }
  }

  setMyForm(){
    this.formVisible = false;
    this.myForm = new FormGroup({});

    if(this.modo == 1){
      this.myForm = new FormGroup({
        idFuenteRecurso: new FormControl(0, [Validators.required]),
        iD_FuenteIngreso: new FormControl(0, [Validators.required]),
        nombreResolucion: new FormControl(null, [Validators.required]),
        valorPresupuestal: new FormControl(null, [Validators.required]),
        archivoResolucion: new FormControl(null)
      });
    }
    else{
      this.myForm = new FormGroup({
        idFuenteRecurso: new FormControl(this.entity.idFuenteRecurso, [Validators.required]),
        iD_FuenteIngreso: new FormControl(this.entity.iD_FuenteIngreso, [Validators.required]),
        nombreResolucion: new FormControl(this.entity.nombreResolucion, [Validators.required]),
        valorPresupuestal: new FormControl(this.entity.valorPresupuestal, [Validators.required]),
        archivoResolucion: new FormControl(null)
      });
    }
    this.formVisible = true;
  }

  get_AsignacionRecursos(){
    this._asignacionRecursosApiService.GetAsignacionesRecursos(this.idVigencia)
    .subscribe(response => {
      if(response.success){
        if(response.result.length > 0){
          this.dataSource = response.result;
        }
        else{
          this.dataSource = [{}];
        }

        this.changeCantItems(this.itemsPerPages[1]);
      }
    });
  }

  get_ETCs(){
    this._masterDataApiService.get_ETCs()
    .subscribe(response => {
      if(response.success){
        this.listETC = response.result;
        this.listETC.sort((a, b) => {
          return a.nombre.localeCompare(b.nombre);
        });
      } else {
        alert("ERROR " +response.error);
      }
    });
  }

  get_FuenteIngresos(){
    this._asignacionRecursosApiService.get_FuenteIngresos(this.myForm.value.idFuenteRecurso)
    .subscribe(response => {
      this.listFuenteIngresos = response.result;
    });
  }

  changeModelAsignacion(name: string, value: any){
    if(name == 'idFuenteRecurso'){
      this.get_FuenteIngresos();
    }
  }

  get_FuentesFinanciacion(){
    this._asignacionRecursosApiService.get_FuentesFinanciacion()
    .subscribe(response => {
      this.listFuentesRecursos = response.result;
    });
  }

  open(content: any) {
    this._modalService.open(content, { modalDialogClass: 'pae-modal' });
  }

  agregar(){
    this.modo = 1;
    this.disabled = false;
    this.entity = { id: 0, disabledValorP: true };
    this.indETC = 0;
    this.dataSourceETC = [{indETC: ++this.indETC, iD_ETC:0, valorAsignado: null, disabled: true}];
    this.gridVisible = false;
    this.sumatoriaETC = 0;
    this.setMyForm();
    $("#txtValorPresupuestal").attr('hidden', 'hidden');
  }

  // verResolucion($event: any){
  //   if($event.type == 'click'){
  //     let element = $event.row;
  //     if(element.id != undefined){
  //       this.modo = 2;
  //       this.idSearch = element.id;
  //       this.gridVisible = false;
  //       this.getAsignacionRecurso(element.id);
  //       $("#txtValorPresupuestal").attr('hidden', 'hidden');
  //     }
  //   }

  // }

  verResolucion(item: any){
    this.modo = 2;
    this.idSearch = item.id;
    this.gridVisible = false;
    this.getAsignacionRecurso(item.id);
    $("#txtValorPresupuestal").attr('hidden', 'hidden');
  }

  atras(){
    this.modo = 0;
    this.formVisible = false;
    this.gridVisible = true;
  }

  editarResolucion(){
    if(this.entity.iD_EstadoResolucion == 2){
      this.disabled = false;
      this.setMyForm();
    }
  }

  clickValorPresupuestal(){
    if(!this.disabled){
      this.entity.disabledValorP = false;
      $("#txtValorPresupuestal").removeAttr('hidden');
      $("#txtValorPresupuestal").focus();
    }
  }
  onBlurValorPresupuestal(){
    this.entity.disabledValorP = true;
    this.entity.valorPresupuestal = this.myForm.value.valorPresupuestal;
    $("#txtValorPresupuestal").attr('hidden', 'hidden');
  }

  cancelarEdicion(){
    this.disabled = true;
    $("#txtValorPresupuestal").attr('hidden', 'hidden');
    this.resetearFormulario();
  }

  eliminarResolucion(contenido: any){
    //this._modalService.open(contenido, { size: 'md' });
    Swal.fire({
      showCloseButton: true,
      html:
        '<img style="height: 30px!important;position: absolute!important; top: 20px!important; right: 17px!important;" src="../.././../../assets/iconos_PAE/PNG/Iconos_PAE-21.png"  width="auto">' +
        '<p style="text-align: left !important; font-size: 13px !important; max-width: 80% !important;">¿Está seguro de que desea eliminar...?'+
        '</p><p style="text-align: left !important; font-size: 13px !important; max-width: 80% !important;">' +
        'Esta acción no se puede revertir.</p>',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonColor: '#005ACB',
      cancelButtonColor: '#005ACB',
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Aceptar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        this.confirmarEliminacion();
      }
    });

  }

  cancelarEliminacion(){
    this._modalService.dismissAll();
  }

  confirmarEliminacion(){
    this._asignacionRecursosApiService.EliminarAsignacionRecursos(this.entity.id)
    .subscribe(response => {
      if(response.success){
        this.atras();
        this.dismissAllModal();
        this.get_AsignacionRecursos();
        //alert("La asignación de recurso ha sido Eliminada!");
      }
    });
  }

  changeIdSearch(id: any){
    this.idSearch = id;
    this.formVisible = false;
    this.getAsignacionRecurso(id);
  }

  filtrar(){
    this.formVisible = false;
    this.getAsignacionRecurso(this.idSearch);
  }

  getAsignacionRecurso(id: number){
    this.nombreResolucionTexto = '';
    this._asignacionRecursosApiService.GetAsignacionRecurso(id)
    .subscribe(response => {
      if(response.success){
        this.elementResolucion = response.result;
        this.resetearFormulario();
        this.get_FuenteIngresos();
      }
    });
  }

  resetearFormulario(){
    this.disabled = true;

    this.entity = {
      id: this.elementResolucion.id,
      idFuenteRecurso: this.elementResolucion.iD_FuenteFinanciacion,
      iD_FuenteIngreso: this.elementResolucion.iD_FuenteIngreso,
      nombreResolucion: this.elementResolucion.nombreResolucion,
      valorPresupuestal: this.elementResolucion.valorPresupuestal,
      iD_EstadoResolucion: this.elementResolucion.iD_EstadoResolucion,
      nombreArchivoResolucion: this.elementResolucion.nombreArchivoResolucion,
      archivoResolucion: this.elementResolucion.archivoResolucion,
      fuenteFinanciacion: this.elementResolucion.fuenteFinanciacion,
      fuenteChip: this.elementResolucion.fuenteChip,
      disabledValorP: true,
    };

    this.nombreResolucionTexto = this.entity.nombreResolucion;

    this.dataSourceETC = [];
    this.indETC = 0;
    this.sumatoriaETC = 0;

    if(this.elementResolucion.distribucionAsignacionRecursos.length > 0){
      for(let i = 0; i < this.elementResolucion.distribucionAsignacionRecursos.length; i++){
        this.dataSourceETC.push({
          indETC: ++this.indETC,
          iD_ETC: this.elementResolucion.distribucionAsignacionRecursos[i].iD_ETC,
          valorAsignado: this.elementResolucion.distribucionAsignacionRecursos[i].valorAsignado,
          disabled: true,
        });

        this.sumatoriaETC += this.elementResolucion.distribucionAsignacionRecursos[i].valorAsignado;
      }
    }
    else { this.dataSourceETC = [{indETC: ++this.indETC, iD_ETC:0, valorAsignado: null, disabled: true}]; }

    this.setMyForm();
  }

  agregarETC(){
    if(!this.disabled){
      let valido = this.validarAgregarETC();
      if(valido){
        this.dataSourceETC.push({indETC: ++this.indETC, iD_ETC:0, valorAsignado: null, disabled: true});
      }
    }
  }

  changeDisabledETC(element: any, value: boolean){
    if(!this.disabled){
      element["disabled"] = value;

      if(!value){
        $("#input" + element.indETC).removeAttr('hidden');
    //    $("#input" + element.indETC).focus();
      }
      else{
        $("#input" + element.indETC).attr('hidden', 'hidden');
      }
    }
  }

  changeSelectModelETC(name: string, $event: any, element: any){
    element[name] = $event;

    if(name == 'valorAsignado'){
      this.sumarValoresETC();
    }
    else{
      element[name] = $event;
      let valido = this.validarPreseleccionDetalleETC();
      if(!valido){
        alert("Existen ETCs duplicadas");
      }
    }
  }

  validarPreseleccionDetalleETC(){
    let busqueda = this.dataSourceETC.reduce((acc: any, item: any) => {
      acc[item.iD_ETC] = ++acc[item.iD_ETC] || 0;
      return acc;
    }, {});

    let duplicados = this.dataSourceETC.filter( (item: any) => {
      return busqueda[item.iD_ETC];
    });

    for(let i = 0; i < this.dataSourceETC.length; i++){
      this.dataSourceETC[i].repetido = false;
    }

    for(let k = 0; k < duplicados.length; k++){
      for(let i = 0; i < this.dataSourceETC.length; i++){
        if(this.dataSourceETC[i].iD_ETC == duplicados[k].iD_ETC){
          this.dataSourceETC[i].repetido = true;
        }
      }
    }

    return duplicados.length > 0 ? false : true;
  }

  sumarValoresETC(){
    this.sumatoriaETC = 0;

    for(let i = 0; i < this.dataSourceETC.length; i++){
      if(this.dataSourceETC[i].valorAsignado){
        this.sumatoriaETC += parseFloat(this.dataSourceETC[i].valorAsignado);
      }
      else{
        this.sumatoriaETC = 0;
        return;
      }
    }
  }

  validarAgregarETC(){
    for(let i = 0; i < this.dataSourceETC.length; i++){
      if(this.dataSourceETC[i].iD_ETC == 0){
        return false;
      }
    }

    return true;
  }

  uploadPDF(){
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    const MAXIMO_BYTES = 100000000;

    fileUpload.onchange = () => {
      if(fileUpload.files?.length && fileUpload.files.length > 0){

        const file = fileUpload.files[0];
        this.fileName = file.name;
        this.entity.archivoResolucion = '';

        if(file.type == 'application/pdf'){
          if(file.size <= MAXIMO_BYTES){

            this.fileName = file.name;
            this.entity.nombreArchivoResolucion = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.entity.archivoResolucion = reader.result?.toString().replace('data:application/pdf;base64,', '');
            };
          }
          else{
            fileUpload.value = '';
            alert("El tamaño del archivo supera los 100MB");
          }
        }
        else{
          fileUpload.value = '';
          alert("El formato del archivo no es un PDF");
        }

      }
    }

    fileUpload.click();
  }

  dismissAllModal(){
    this._modalService.dismissAll();
  }

  abrirPDF(contenido: any){
    if(this.entity.archivoResolucion != null){
      this.srcPDF = "data:application/pdf;base64," + this.entity.archivoResolucion;
      this._modalService.open(contenido, {size: 'xl'});
    }
  }

  downloadFile():void{
    const file = 'data:application/pdf;base64,' + this.entity.archivoResolucion;
    const link = document.createElement("a");
    link.href = file;
    link.download = this.entity.nombreArchivoResolucion;
    link.click();
  };

  public configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };

  public configError: MatSnackBarConfig = {
    panelClass: ['style-error'],
  };

  onSubmit(idEstadoResolucion: number){
    this.loadingVisible = true;

    this.idEstadoResolucion = idEstadoResolucion;

    if(this.myForm.controls.idFuenteRecurso.status == 'INVALID' || this.myForm.value.idFuenteRecurso == 0){
      this.loadingVisible = false;
      alert("El campo fuente de recurso es obligatorio");
      return;
    }

    if(this.myForm.controls.iD_FuenteIngreso.status == 'INVALID' || this.myForm.value.iD_FuenteIngreso == 0){
      this.loadingVisible = false;
      alert("El campo tipo fuente CHIP es obligatorio");
      return;
    }

    if(this.myForm.controls.nombreResolucion.status == 'INVALID' || this.myForm.value.nombreResolucion.toString().trim() == ''){
      this.loadingVisible = false;
      alert("El campo nombre de la resolución es obligatorio");
      return;
    }

    if(this.myForm.controls.valorPresupuestal.status == 'INVALID'){
      this.loadingVisible = false;
      alert("El campo valor presupuestal es obligatorio");
      return;
    }

    if(this.myForm.value.valorPresupuestal <= 0 && idEstadoResolucion == 1){
      this.loadingVisible = false;
      alert("El campo valor presupuestal debe ser un valor mayor a cero (0)");
      return;
    }

    if(idEstadoResolucion == 1 && this.myForm.value.valorPresupuestal != this.sumatoriaETC){
      this.loadingVisible = false;
      alert("El valor presupuestal debe ser igual a la total asignado.");
      return;
    }

    if(!this.validarPreseleccionDetalleETC()){
      this.loadingVisible = false;
      alert("Existen ETCs duplicadas");
      return;
    }

    if(idEstadoResolucion == 1 &&
      (!this.entity.archivoResolucion || this.entity.archivoResolucion == "")){
        this.loadingVisible = false;
        alert("Adjunte un documento con la resolución.")
      return;
    }

    this.validarNombreResolucion();
  }

  validarNombreResolucion(){
    let param = {
      id: this.entity.id,
      nombre: this.myForm.value.nombreResolucion.toString().trim(),
      idVigencia: this.idVigencia
    };

    this._asignacionRecursosApiService.ExisteNombreReslucionPorVigencia(param)
    .subscribe(response => {
      if(response.success){
        if(response.result == false){
          this.grabarResolucion();
        }
        else{
          this.loadingVisible = false;
          alert("Ya existe una resolución con el mismo nombre.");
        }
      }
      else{
        this.loadingVisible = false;
        alert("Error al validar el nombre de la resolución");
      }
    });

    return true;
  }

  grabarResolucion(){
    this.entity.iD_FuenteFinanciacion = this.myForm.value.idFuenteRecurso;
    this.entity.iD_FuenteIngreso = this.myForm.value.iD_FuenteIngreso;
    this.entity.nombreResolucion = this.myForm.value.nombreResolucion.toString().trim();
    this.entity.valorPresupuestal = this.myForm.value.valorPresupuestal;
    this.entity.iD_EstadoResolucion = this.idEstadoResolucion;
    this.entity.vigencia = this.idVigencia;
    this.entity.distribucionAsignacionRecursos = this.get_ETCsDistribucionAsignacion();
    this.entity.archivoResolucion = !this.entity.archivoResolucion ? "" : this.entity.archivoResolucion;
    this.entity.nombreArchivoResolucion = !this.entity.nombreArchivoResolucion ? "" : this.entity.nombreArchivoResolucion;

    if(this.entity.id > 0){
      this.editarAsignacionRecurso();
    }
    else{
      this.agregarAsignacionRecurso();
    }
  }

  get_ETCsDistribucionAsignacion(){
    let data = [];
    for(let i = 0; i <this.dataSourceETC.length; i++){
      if(this.dataSourceETC[i].iD_ETC > 0){
        data.push(this.dataSourceETC[i]);
      }
    }
    return data;
  }

  agregarAsignacionRecurso(){
    this._asignacionRecursosApiService.AgregarAsignacionRecursos(this.entity)
    .subscribe(response => {
      this.loadingVisible = false;
      if(response.success){
        this.get_AsignacionRecursos();
        this.modo = 0;
        this.formVisible = false;
        this.gridVisible = true;
      }
      else{
        alert(response.error);
      }
    });
  }

  editarAsignacionRecurso(){
    this._asignacionRecursosApiService.EditarAsignacionRecursos(this.entity)
    .subscribe(response => {
      this.loadingVisible = false;
      if(response.success){
        this.get_AsignacionRecursos();
        this.modo = 0;
        this.formVisible = false;
        this.gridVisible = true;

        alert("Los datos han sido guardados correctamente!");
      }
      else{
        alert(response.error);
      }
    });
  }

  getModulePermission(module:number,action:string):boolean{
    return this._seguridadService.getModulePermission(module,action); 
  }

}
