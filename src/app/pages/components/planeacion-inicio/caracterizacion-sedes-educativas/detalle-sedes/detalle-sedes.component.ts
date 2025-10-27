import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { AccesosApiService  } from '../../../../../shared/services/acceso-api.service'
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';

import { Acceso } from '../../../../../shared/model/acceso.model'

@Component({
  selector: 'app-detalle-sedes',
  //providers: [ AccesosApiService, MasterDataApiService ],
  templateUrl: './detalle-sedes.component.html',
  styleUrls: ['./detalle-sedes.component.sass']
})
export class DetalleSedesComponent implements OnInit , OnDestroy{

  private sub : any;

  idRowSelect = -1;
  private subs = new Subscription()
  idETC = +(localStorage.getItem('IdUbicacion') ?? 0);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  idTab = 1
  displayedColumns: string[] = ['municipio', 'institucion', 'sede', 'zona', 'centro', 'trayectos', 'clasificacion'];
  dataSource: any;
  datos!: Acceso[];
  optionSelect = { iD_Divipola: 0, municipio: 'Elije un municipio' }
  dataZonasDivipolas = [];
  dataMunicipiosETC = [];
  dataZonasDivipolasBackup = [];
  disableZona = true;
 
  paginador = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 50, 100]
  }

  constructor(
    private router: Router,
    private _accesosApiService : AccesosApiService,
    private _masterDataApiService: MasterDataApiService,
    private _messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){

    this.sub = this.route.params.subscribe(params => {
      if(params['Id']){
        //this.idETC = +params['Id'];
      }
      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });

    this.get_MunicipiosporETC()
    this.get_ZonasDivipolasPorETC();
    this.getList();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
 
  get_MunicipiosporETC(){
    this.dataMunicipiosETC = [];

    this._masterDataApiService.GetMunicipiosByDepartamentoETC(this.idETC).subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError(response.error, 'top center', 5000);
          return;
        }

        response.result.forEach(element => {
          const item = { ...element }
          this.dataMunicipiosETC.push(item);

        });
      },
      error: error => {
        this._messageService.showError(error, 'top center', 5000);
      }
    })
  }


  get_ZonasDivipolasPorETC(){
    this.dataZonasDivipolas = [];
    this.dataZonasDivipolasBackup = [];

    this._masterDataApiService.get_ZonasDivipolasPorETC(this.idETC).subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError(response.error, 'top center', 5000);
          return;
        }

        response.result.forEach(element => {
          const item = { ...element }
          this.dataZonasDivipolas.push(item);

          const itemBackup = { ...element }
          this.dataZonasDivipolasBackup.push(itemBackup);
        });
      },
      error: error => {
        this._messageService.showError(error, 'top center', 5000);
      }
    })
  }

  changeItem(item, name: string, value){
    item[name] = value;
  }

  editarZonasDivipolas(){
    this.disableZona = false;
  }
  cancelarZonasDivipolas(){
    this.dataZonasDivipolas = [];
    this.dataZonasDivipolasBackup.forEach(element => {
      const itemBackup = { ...element }
      this.dataZonasDivipolas.push(itemBackup);
    });

    this.disableZona = true;
  }
  guardarZonasDivipolas(){
    const data = this.validarZonasDivipolas();
    if(!(data.length > 0)) { return; }

    this._masterDataApiService.UpdateZonasDivipolas(data).subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError(response.error, 'top center', 5000);
          return;
        }

        this.disableZona = true;
        this._messageService.showInfo('Los datos han sido guardados correctamente.', 'top center', 5000);
        this.getList();
      },
      error: error => {
        this._messageService.showError(error, 'top center', 5000);
      }
    });
  }

  validarZonasDivipolas(){
    const listZonasDivipolas = [];
    for(let i = 0; i < this.dataZonasDivipolas.length; i++){
      if(!(this.dataZonasDivipolas[i].idMunicipioAcopio > 0)){
        this._messageService.showWarning('Seleccione el campo "' + this.dataZonasDivipolas[i].zona + '".', 'top center', 5000);
        return [];
      }

      const item = {
        iD_Zona: this.dataZonasDivipolas[i].iD_Zona,
        idMunicipioAcopio: this.dataZonasDivipolas[i].idMunicipioAcopio
      };

      listZonasDivipolas.push(item);
    }

    return listZonasDivipolas;
  }

  getList() {
    this._accesosApiService.get_Transporte(this.idETC).subscribe({
      next: response => {
        if(!response.success){
          this._messageService.showError(response.error, 'top center', 5000);
          return;
        }

        let i = 0;
        response.result.map(function(item: any){
          item.id = ++i;
          item.trayectosAccesotext = item.trayectosAcceso == 0 ? 'Sin definir': item.trayectosAcceso;
          item.tipoAccesotext = item.tipoAcceso == null ? 'Sin definir': item.tipoAcceso;
          return item;
        });


        this.dataSource = new MatTableDataSource(response.result);
        this.setPageIndexItem();
      },
      error: error => {
        this._messageService.showError(error, 'top center', 5000);
      }
    });
  }

  setPageIndexItem(){
    const fila = this.getIndexList() + 1;
    if(fila > 0){
      this.paginator.pageIndex = parseInt((fila / this.paginador.pageSize).toString());
    }
    this.dataSource.paginator = this.paginator;
  }

  getIndexList(){
    const data = this.dataSource._data._value;
    for(let i = 0; i < data.length; i++){
      if(data[i].id == this.idRowSelect){
        return i;
      }
    }
    return -1;
  }

  setRuta(item: any){
    this.router.navigate(['/trayectos'], { queryParams: {id:item.sedeId, centro: item.centroAcopioId,tipo:item.tipoETCId,tab:1} });
  }

}
