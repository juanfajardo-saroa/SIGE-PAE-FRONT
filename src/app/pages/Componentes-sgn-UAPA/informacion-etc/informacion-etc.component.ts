import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { fileUploadModel } from 'src/app/shared/model/fileUpload';
import { RepositoriosExtendModel } from 'src/app/shared/model/Repositorios-Extend';
import { RepositoriosExtendService } from 'src/app/shared/services/Repositorios-Extend.services';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { Moment } from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/shared/services/Categorias.services';
import { CategoriasModel } from 'src/app/shared/model/Categorias';
import Swal from 'sweetalert2';
import { Guid } from 'guid-typescript';
import { TipoArchivoModel } from 'src/app/shared/model/TipoArchivo';
import { TipoArchivoService } from 'src/app/shared/services/TipoArchivo.services';
import { VigenciasService } from 'src/app/shared/services/Vigencias.services';
import { VigenciasModel } from 'src/app/shared/model/Vigencias';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ETService } from 'src/app/shared/services/ET.services';
import { ETCService } from 'src/app/shared/services/ETC.services';
import { ETCModel } from 'src/app/shared/model/ETC';


@Component({
  selector: 'app-informacion-etc',
  templateUrl: './informacion-etc.component.html',
  styleUrls: ['./informacion-etc.component.scss']
})
export class InformacionETCComponent implements OnInit,AfterViewInit, OnDestroy  {

  fechaConv: any;
  public nombreRol = "";
  public nombreUsuario = "";
  public nombreCategoria = "";
  public nombreCargo = "";
  public sistemaSelect = "";
  yaCargoUbicacion: boolean = false;
  public nombreApp = localStorage.getItem('nombreSistema');
  private subs = new Subscription();
  selectedCategory = '0';
  searchValue: string = '';
  rolbase = localStorage.getItem('RolBase');
  public nombreUbicacion = 'UApA | Consulta de Información Detallada';
  currentYear = new Date().getFullYear();
  dateToday: number = Date.now();
  public dataArrayInterno: any;
  public ViSeleccionada = localStorage.getItem('VigSeleccionada');
  public ViNoSeleccionada = localStorage.getItem('VigNoSeleccionada');
  mostarEncabezadoMenu: boolean = true;
  VigSelect: string = 'si';
  VigNoSelect: string = 'no';
  Vigencia: any;
  nombreVigAnoSeleccionada: number = 0;
  public dataArray: any;
  public dataArrayInternoVigSelect: any;
  public dataArrayInternoVigNoSelect: any;
  sistemaSeleccionado: string;
  isLoading = true;
  ETCIdSelecconada: number=0;
  ETCNombreSeleccionada="";
  cargueETC:boolean=false;
  dataSourceList: any = [];
  UbicacionesListETCs: any[];
  UbicacionesListETs: any[];
  UbicacionesList: any[];

  constructor(
      public dialog: MatDialog,
      private seguridadService: SeguridadService,
      private router: Router,
      public VigenciasServicio: VigenciasService,
      private ETCService: ETCService,
      private ETService: ETService,
    ) {
      localStorage.setItem('KeylayoutC','No');
     }

  ngOnInit(): void {
    localStorage.setItem('KeylayoutC','No');
    this.cargueETC=false;
    this.getListETCs();
  //  this.getListETs();

  }

  getListETCs() {
    this.ETCService.getETCList().subscribe(
      (response: any) => {
        this.UbicacionesListETCs = response;
      },
      (err) => {
      }
    );

  }

  getListETs() {
    this.ETService.getETList().subscribe(
      (response: any) => {
        this.UbicacionesListETs = response;
        this.UbicacionesListETs.forEach(element => element.iD_ETC = this.ETCIdSelecconada);
      },
      (err) => {
      }
    );
  }

  onETCClick(value: any): void {
    this.ETCIdSelecconada=value;
    this.ETCNombreSeleccionada = this.UbicacionesListETCs.find(element=> element.id == value).nombre;
    this.ETService.getETListRelationFilter(value).subscribe(
      (response: any) => {
        this.UbicacionesListETs = response;
      },
      (err) => {
      }
    );
      var ubi = this.ETCIdSelecconada;
      var nombreUbi = "ETC | " + this.ETCNombreSeleccionada;
      var nombreUbi2 = "Funcionario";
      var nombreUbi3 = "Retor";
       let ubf = localStorage.getItem('IdUbicacion');
      //this.seguridadService.ValidateFullPermissions();
        localStorage.setItem("IdUbicacion", ubi.toString());
        localStorage.setItem("NombreUbicacion", this.ETCNombreSeleccionada);
        localStorage.setItem('Ubicacion', nombreUbi);
        localStorage.setItem('UbicacionShow', nombreUbi2);
        localStorage.setItem('UbicacionShowRector', nombreUbi3);
        localStorage.setItem('UbicacionShort', nombreUbi3);
      //this.dialogRef.close({ data: this.form.value });
      //window.location.reload();
  }

  ConsultarBotonETC() {
    if (this.ETCIdSelecconada == 0)
    {}
    else{

    localStorage.setItem('SistemaSelect', 'sigepae');
    localStorage.setItem('nombreSistema', 'SiGE-PAE: Subsistema de gestión para Entidades Territoriales (ETC/ETnC)');
    localStorage.setItem('Sistema', 'true');
    localStorage.setItem('MenuSigenaUapa', 'false');
    localStorage.setItem('MenuSigepae', 'true');
    localStorage.setItem('MenuMipae', 'false');
    localStorage.setItem('KeylayoutA','Si');
    localStorage.setItem('KeylayoutB','Si');
    localStorage.setItem('KeylayoutC','Si');
    //this.router.navigate(["/inicio"]);
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    let h = loc.hash;
    this.router.navigate(["/ResumenETC"]).then(() => {
    window.location.reload();
    });
  }
}

RetornoBotonETC() {
  localStorage.setItem('Inicio', 'false');
  localStorage.setItem('MenuSigepae', 'false');
  localStorage.setItem('MenuMipae', 'false');
  localStorage.setItem('RolSuperUapa', 'Si');
  localStorage.setItem('MenuSigenaUapa', 'true');
  localStorage.setItem('SistemaSelect', 'sgnUAPA');
  localStorage.setItem('nombreSistema', 'SGN UApA: Subsistema de gestión Nacional');
  localStorage.setItem('Sistema', 'true');
  localStorage.setItem('Ubicacion', 'UApA');
  localStorage.setItem('KeylayoutA','Si');
  localStorage.setItem('KeylayoutB','Si');
  localStorage.setItem('KeylayoutC','Si');

  localStorage.setItem('nombredeUbicacionActualizado', 'si')
  this.seguridadService.ValidateFullPermissions();
  this.router.navigate(['/iniciosgn']).then(() => {
    window.location.reload();
  });
}


  ngOnDestroy() {
    localStorage.setItem('KeylayoutA','Si');
    localStorage.setItem('KeylayoutB','Si');
    localStorage.setItem('KeylayoutC','Si');
    if (this.subs) {
      this.subs.unsubscribe();
    }

  }

  ngAfterViewInit(): void {
  }

  IraET(BusqTitulo: any) {
  }

  IraETC(BusqTitulo: any) {
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
