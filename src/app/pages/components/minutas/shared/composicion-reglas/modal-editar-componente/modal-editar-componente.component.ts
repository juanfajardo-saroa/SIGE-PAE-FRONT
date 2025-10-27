import { Component, Inject, OnInit ,OnDestroy} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/Componentes-mi-pae/SedesBeneficiarias/list-SedesBeneficiarias-component/custom-sedes-beneficiarias/DialogData';
import { MessageService } from 'src/app/services/message.service';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { LocalStorage } from 'src/app/static/local-storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-editar-componente',
  templateUrl: './modal-editar-componente.component.html',
  styleUrls: ['./modal-editar-componente.component.scss']
})
export class ModalEditarComponenteComponent implements OnInit ,OnDestroy{
  dataComponente: any;
  mostrarNuevoGrupo: boolean = false;
  mostrarNuevoSubgrupo: boolean = false;
  Id_SubGrupo: number;
  idNewGrupoSelected: number = 0;
  nuevoGrupo: any;
  posicionGrupoAgrearSubgrupo: number = 0;
  listaGruposAlimentos: any[] = [];
  listaSubgruposAlimentos: any[] = [];
  dataAlimentos: any[] = [];
  private subs = new Subscription() 

  /*public dataAlimentos: any = {
    iD_Componente: 0,
    iD_TipoComponente: 0,
    iD_GrupoAlimento: 0,
    iD_SubGrupoAlimento: 0,
    estado :true,
    auditoria: LocalStorage.getAuditoria('')
  };*/

  public listNewSubGroup: any = {
    iD_Componente: 0,
    id: 0,
    listSubGrupo: [],
    max_Gramo: 0,
    minVisible: false,
    min_Gramo: 0,
    nombre: '',
    unidadMedida: ''
  };
  public listNewGroup: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private minutasApiService: MinutasApiService,
    private mensajeService: MessageService,
  ) { }

  ngOnInit(): void {
    this.dataComponente = this.data;
    this.getGrupos();
    this.getSubgrupos();
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
  getGrupos() {
    this.minutasApiService.get_GruposModeloTipo(this.dataComponente.iD_TipoModeloOperacion,this.dataComponente.iD_ModalidadComplemento,this.dataComponente.iD_TipoComplemento).subscribe(respuesta => {
      if (respuesta.success) {
        this.listaGruposAlimentos = respuesta.result;
      } else {
        this.mensajeService.showError('ERROR: ' + respuesta.error, 'top center', 5000);
      }
    }, error => {
      this.mensajeService.showError('ERROR: ' + error, 'top center', 5000);
    });
  };

  getSubgrupos() {
    this.minutasApiService.get_SubGruposModeloTipo(this.dataComponente.iD_TipoModeloOperacion,this.dataComponente.iD_ModalidadComplemento,this.dataComponente.iD_TipoComplemento,0).subscribe(respuesta => {
      if (respuesta.success) {
        this.listaSubgruposAlimentos = respuesta.result;
      } else {
        this.mensajeService.showError('ERROR: ' + respuesta.error, 'top center', 5000);
      }
    }, error => {
      this.mensajeService.showError('ERROR: ' + error, 'top center', 5000);
    });
  };

  emitNewGrupo(response) {
    //Logica por grupos
    this.listNewSubGroup = response;
    this.getDataMinutaAlimentos();
  }

  modificarComponente() {

    let data = {
      ListAlimentoMinuta: this.dataAlimentos
    };

    this.minutasApiService.UpdateAlimentosNutrientesPatronComponente(this.dataComponente.iD_MinutaPatronAlimento, this.dataComponente.iD_TipoComponente, data)
      .subscribe(response => {
      });
  }

  addNewGroup() {
    this.listNewGroup.push({
      iD_Componente: this.dataComponente.iD_TipoComponente,
      id: 0,
      listSubGrupo: [],
      max_Gramo: 0,
      minVisible: false,
      min_Gramo: 0,
      nombre: "",
      unidadMedida: ""
    });
  }

  getDataMinutaAlimentos() {
    if(this.listNewSubGroup.listSubGrupo.length > 0) {
      const obj = this.listNewSubGroup;
      for (let j = 0; j < obj.listSubGrupo.length; j++) {
        this.dataAlimentos.push({
          iD_TipoComponente: this.dataComponente.iD_TipoComponente,
          iD_GrupoAlimento: obj.listSubGrupo[j].iD_Grupo,
          iD_SubGrupoAlimento: obj.listSubGrupo[j].id,
          estado :true,
          auditoria: LocalStorage.getAuditoria('')
        });
      };
    } else {
      this.dataAlimentos.push({
        iD_TipoComponente: this.dataComponente.iD_TipoComponente,
        iD_GrupoAlimento: this.listNewSubGroup.id,
        estado :true,
        auditoria: LocalStorage.getAuditoria('')
      });
    }
  }
}
