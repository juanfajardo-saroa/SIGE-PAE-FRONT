import { Component, OnInit, Input, Output, EventEmitter  ,OnDestroy} from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-grupo-modal-editar-component',
  templateUrl: './grupo-modal-editar-component.component.html',
  styleUrls: ['./grupo-modal-editar-component.component.scss']
})
export class GrupoModalEditarComponentComponent implements OnInit ,OnDestroy {

  @Input() grupo: any;
  @Input() listGrupos: any[] = [];
  @Input() listSubGrupos: any[] = [];
  @Input() isNewGroup: boolean;
  @Output() emitNewGrupo = new EventEmitter<any>();

  public newGroup: any = {
    iD_Componente: 0,
    id: 0,
    listSubGrupo: [],
    max_Gramo: 0,
    minVisible: false,
    min_Gramo: 0,
    nombre: '',
    unidadMedida: ''
  };

  public listNewSubGroup: any[] = [];
  private subs = new Subscription() 

  constructor(private _mensajeService: MessageService,) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  habilitarNuevoSubgrupo() {
    if (!this.listNewSubGroup.find(newSubGroup => newSubGroup.id === 0)) {
      this.listNewSubGroup.push({
        iD_Componente: 0,
        id: 0,
        nombre: "",
        iD_Grupo: (this.isNewGroup ? this.newGroup.id : this.grupo.id)
      });
    } else {
      this._mensajeService.showError('Debe seleccionar un subgrupo antes de agregar uno nuevo.', 'top center');
    }
  }

  changeModel(name: string, value: any, item: any, listaPertenece: any) {
    if (value != 0 && listaPertenece == 'subGrupo') {
      let subGrupo = this.listSubGrupos.find(i => i.id == value);
      item[name] = subGrupo.nombre;
      if(this.newGroup.nombre === ""){
        Object.assign(this.newGroup, this.grupo);
      }
      let listTotalSubGrupos = this.listNewSubGroup.filter(newSubGroup => !this.newGroup.listSubGrupo.includes(newSubGroup));
      this.newGroup.listSubGrupo = this.newGroup.listSubGrupo.concat(listTotalSubGrupos);
    }
    else if (value != 0 && listaPertenece == 'grupo') {
      let grupo = this.listGrupos.find(i => i.id == value);
      item[name] = grupo.nombre;
    }

    if (this.isNewGroup && this.listNewSubGroup.length > 0) {
      this.newGroup.iD_Componente = this.grupo.iD_Componente;
    }
    this.emitNewGrupo.emit(this.newGroup);
  }

  filtrarSubgruposPorIdGrupo(idGrupo: number): any[] {
    return this.listSubGrupos.filter(element => element.iD_GrupoAlimento == idGrupo);
  }
}
