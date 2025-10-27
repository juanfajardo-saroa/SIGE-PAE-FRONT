import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output ,OnDestroy} from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ContratosApiService } from 'src/app/shared/services/contratos-api.service';
import { MasterDataApiService } from 'src/app/shared/services/master-data-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
@Component({
  selector: 'app-detalle-proceso-contractual-suministro-rural',
  //providers: [MasterDataApiService, ContratosApiService],
  templateUrl: './detalle-proceso-contractual-suministro-rural.component.html'
})
export class DetalleProcesoContractualSuministroRuralComponent implements OnInit,OnDestroy {

  @Input() dataContrato: any;
  @Output() finalizarEvent = new EventEmitter<any>();
  @Output() regresarEvent = new EventEmitter<any>();
  @Output() onSubmitEvent = new EventEmitter<any>();

  private subs = new Subscription()
  idETC = Number(localStorage.getItem('IdUbicacion') ?? '0');
  editarRacionesDiarias = false;
  Numdias = 0;
  myForm = this._formBuilder.group({
    iD_EstadoContrato: [0],
    fechalnicioContrato: [null, [Validators.required]],
    fechaFinalContrato: [null, [Validators.required]],
    iD_Divipola: [0, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
    iD_lE: [0, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
    iD_Sede: [0, [Validators.required, this.forbiddenNUmberValidator(/0/i)]],
    numeroDias: [null, [Validators.required]]
  });

  listMunicipios = [];
  listInstitucion = [];
  listSedes = [];

  dataComplementosDiariosContratados = [];
  dataTotalComplementosContratados = [];
  public showValidationTable: boolean = false;

  listRequeried = [
    { name: 'fechalnicioContrato', inValid: false },
    { name: 'fechaFinalContrato', inValid: false },
    { name: 'iD_Divipola', inValid: false },
    { name: 'iD_lE', inValid: false },
    { name: 'iD_Sede', inValid: false },
    { name: 'numeroDias', inValid: false },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _masterDataApiService: MasterDataApiService,
    private _contratosApiService: ContratosApiService,
    private _messageService: MessageService,
    private _dp: DatePipe
  ) { }

  forbiddenNUmberValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value <= 0 || control.value == '0';
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    }
  }

  ngOnInit(): void {
    this.get_Municipios();
    this.get_DetallesSumRacionesMAER();
    this.get_TotalRacionesMAER();
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  initForm() {
    if (this.dataContrato) {
      this.myForm.patchValue({
        iD_EStadoContrato: this.dataContrato.iD_EstadoContrato,
        fechalnicioContrato: this.dataContrato.fechalnicioContrato,
        fechaFinalContrato: this.dataContrato.fechaFinalContrato,
        numeroDias: this.dataContrato.noMeses
      });

      if (this.dataContrato.iD_Sede && this.dataContrato.iD_Sede > 0) {
        this.myForm.patchValue({
          iD_Divipola: this.dataContrato.iD_Divipola,
          iD_lE: this.dataContrato.iD_lE,
          iD_Sede: this.dataContrato.iD_Sede
        });

        this.get_InstitucionByMunicipioETC(true);
        this.get_SedesByInstitucion(true);
      }
      else { this.getset_SedeContratoModeloMaer(); }
    }
  }

  getset_SedeContratoModeloMaer() {
    this._contratosApiService.get_SedeContratoModeloMaer(this.dataContrato.id, 2).subscribe(response => {

      if (!response.success) {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }
      if (response.result != null) {
        const result = response.result;
        this.dataContrato.idSedeContratoMaer = result.id;
        this.dataContrato.iD_Divipola = result.iD_Divipola;
        this.dataContrato.iD_lE = result.iD_IE;
        this.dataContrato.iD_Sede = result.iD_Sede;

        this.myForm.patchValue({
          iD_Divipola: this.dataContrato.iD_Divipola,
          iD_lE: this.dataContrato.iD_lE,
          iD_Sede: this.dataContrato.iD_Sede
        });
        this.get_InstitucionByMunicipioETC(true);
        this.get_SedesByInstitucion(true);
      }
    });
  }

  getValid(name) {
    if (this.myForm.get(name).invalid && (this.myForm.get(name).touched || this.myForm.get(name).dirty))
      return false;

    if (this.myForm.get(name).invalid) {
      for (let i = 0; i < this.listRequeried.length; i++) {
        if (this.listRequeried[i].name == name && this.listRequeried[i].inValid)
          return false;
      }
    }

    return true;
  }

  finalizar() {
    this.updateContrato(true);
  }

  regresar() {
    this.regresarEvent.emit('DETALLE_PROCESO');
  }

  siguiente() {
    if (!this.myForm.valid) {
      for (let i = 0; i < this.listRequeried.length; i++) {
        if (this.myForm.controls[this.listRequeried[i].name].invalid) {
          this.listRequeried[i].inValid = true;
        }
      }
      return;
    }
    this.updateContrato(false);
    this.guardarSedeContratoMaer();

  }


  onSubmit(event) {
    if (!this.myForm.valid) {
      for (let i = 0; i < this.listRequeried.length; i++) {
        if (this.myForm.controls[this.listRequeried[i].name].invalid) {
          this.listRequeried[i].inValid = true;
        }
      }
      return;
    }
    }



  updateContrato(finalizar: boolean) {
    this.dataContrato.fechalnicioContrato = this.myForm.get('fechalnicioContrato').value;
    this.dataContrato.fechaFinalContrato = this.myForm.get('fechaFinalContrato').value;
    this.dataContrato.iD_Divipola = this.myForm.get('iD_Divipola').value;
    this.dataContrato.iD_lE = this.myForm.get('iD_lE').value;
    this.dataContrato.iD_Sede = this.myForm.get('iD_Sede').value;
    this.dataContrato.noMeses = this.myForm.get('numeroDias').value;
    this.dataContrato.estado =true;
    this.dataContrato.auditoria = LocalStorage.getAuditoria('');

    this._contratosApiService.updateContrato(this.dataContrato).subscribe(response => {
      if (!response.success) {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }

      if (finalizar) {
        this.onSubmitEvent.emit({ data: this.dataContrato, form: 'GUARDAR Y CONTINUAR' });
        this.finalizarEvent.emit('');
      }
      else {
        this.onSubmitEvent.emit({ data: this.dataContrato, form: 'DETALLE_PROCESO' });
      }
    });
  }

  guardarSedeContratoMaer() {
    const params = [
      {
        id: this.dataContrato.idSedeContratoMaer ?? 0,
        iD_Sede: this.dataContrato.iD_Sede,
        iD_SedeJornada: 0,
        estado: true,
        auditoria: LocalStorage.getAuditoria(''),
        id_Contrato: this.dataContrato.id,
        id_TipoModeloOperacion: 2
      }
    ];

    this._contratosApiService.agregarSedesBeneficiarias(params).subscribe(response => {
      if (!response.success) {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }


    });
  }

  get_Municipios() {
    this._masterDataApiService.get_MunicipiosByETC(this.idETC).subscribe({
      next: response => {
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }
        this.listMunicipios = response.result;
        if (this.myForm.get('iD_Divipola').value>0)
        {
          this.get_InstitucionByMunicipioETC(true);
          this.get_SedesByInstitucion(true);
        }
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    })
  }

  get_InstitucionByMunicipioETC(preSel: boolean) {
    if(!preSel) {
      this.myForm.get('iD_lE').setValue(0);
    }
    const idMunicipio = this.myForm.get('iD_Divipola').value;
    if (idMunicipio && idMunicipio > 0) {
      this._masterDataApiService.get_InstitucionByMunicipioETC(this.idETC, idMunicipio).subscribe({
        next: response => {
          if (!response.success) {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
            return;
          }
          this.listInstitucion = response.result;
        },
        error: error => {
          this._messageService.showError('ERROR: ' + error, 'top center');
        }
      })
    }
  }

  get_SedesByInstitucion(preSel: boolean) {
    if(!preSel) {
      this.myForm.get('iD_Sede').setValue(0);
    }
    const idInstitucion = this.myForm.get('iD_lE').value;
    if (idInstitucion && idInstitucion > 0) {
      this._masterDataApiService.get_Sedes(idInstitucion).subscribe({
        next: response => {
          if (!response.success) {
            this._messageService.showError('ERROR: ' + response.error, 'top center');
            return;
          }
          this.listSedes = response.result;
        },
        error: error => {
          this._messageService.showError('ERROR: ' + error, 'top center');
        }
      })
    }
  }

  blurNumeroDias() {
    this.get_TotalRacionesMAER();
  }

  editarSumRacionesMAER() {
    this.editarRacionesDiarias = true;
  }

  get_DetallesSumRacionesMAER() {
    this.editarRacionesDiarias = false;
    this._contratosApiService.get_DetallesSumRacionesMAER(this.dataContrato.id, 2).subscribe({
      next: response => {
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.dataContrato.noMeses = response.result.length > 0 ? response.result[0].diasSuministro : 0;
        this.dataComplementosDiariosContratados = response.result;
        this.myForm.get('numeroDias').setValue(this.dataContrato.noMeses);
        this.myForm.get('iD_EstadoContrato').setValue(response.result[0].estadoDiligenciamiento);
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    })
  }

  cancel_UpdateContratosDetallesSumRacionesMAER() {
    this.get_DetallesSumRacionesMAER();
  }
  put_UpdateContratosDetallesSumRacionesMAER() {
    let numdia = this.myForm.get('numeroDias').value;
    this.dataComplementosDiariosContratados.map(function (item: any) {
      item.showValidationTable = true;
      item.estado = true;
      item.auditoria =LocalStorage.getAuditoria('');
      item.diasSuministro = numdia;
      return;
    });
    //item.diasSuministro =this.myForm.get('numeroDias').value;
    //item.mesesSuministro =this.myForm.get('numeroDias').value;


    this._contratosApiService.put_UpdateContratosDetallesSumRacionesMAER(this.dataComplementosDiariosContratados).subscribe(response => {
      if (!response.success) {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }
      else
      {
        this.editarRacionesDiarias = false;
        this.get_TotalRacionesMAER();
        this.get_DetallesSumRacionesMAER();
      }
    });
  }

  get_TotalRacionesMAER() {
    this._contratosApiService.get_TotalRacionesMAER(this.dataContrato.id, 2, this.myForm.get('numeroDias').value ?? 0).subscribe({
      next: response => {
        if (!response.success) {
          this._messageService.showError('ERROR: ' + response.error, 'top center');
          return;
        }

        this.dataTotalComplementosContratados = response.result;
      },
      error: error => {
        this._messageService.showError('ERROR: ' + error, 'top center');
      }
    })
  }

  put_UpdateContratosCaracteristicasFinancierasMAER() {
    this._contratosApiService.put_UpdateContratosCaracteristicasFinancierasMAER([]).subscribe(response => {
      if (!response.success) {
        this._messageService.showError('ERROR: ' + response.error, 'top center');
        return;
      }
    });
  }

}
