import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MinutasApiService } from 'src/app/shared/services/minutas-api.service';
import { MessageService } from 'src/app/services/message.service';
import { SubgrupoMinutaMAER } from 'src/app/shared/constants/subgrupo-minuta-maer.constant';
import { GrupoMinutaMAER } from 'src/app/shared/constants/grupo-minuta-maer.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-composicion-reglas-maer',
  templateUrl: './composicion-reglas-maer.component.html',
  styleUrls: ['./composicion-reglas-maer.component.scss'],
})
export class ComposicionReglasMaerComponent implements OnInit, OnDestroy {
  @Input() set IdMinutaPatronAlimento(IdMinutaPatronAlimento) {
    if (IdMinutaPatronAlimento) {
      this.idMinutaPatronAlimento = IdMinutaPatronAlimento;
      this.get_AlimentosMinutaMAERReglas();
    }
  }

  @Input() ItemsDisabled: boolean;
  @Input() TipoComplementoId: number;
  @Output() dataSourceComponentesMod = new EventEmitter<any>();
  @Output() dataComponentInPreparationsMod = new EventEmitter<any>();

  public readonly TipoComplementoAlmuerzo = 1;
  public readonly subgrupoMinutaMAER = SubgrupoMinutaMAER;
  public readonly grupoMinutaMAER = GrupoMinutaMAER;
  private subs = new Subscription();
  public itemComponent: any;
  public dataSourceComponents: any;
  public dataComponentInPreparations = [];
  public listFrecuencias = [];
  public idMinutaPatronAlimento: number;
  constructor(
    private _minutasApiService: MinutasApiService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.get_Frecuencias();
    this.get_AlimentosMinutaMAERReglas();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  get_Frecuencias() {
    this._minutasApiService.get_Frecuencias().subscribe({
      next: (response) => {
        if (!response.success) {
          this._messageService.showError(
            'ERROR en el listado de frecuencias: ' + response.error,
            'top center',
            5000
          );
          return;
        }

        this.listFrecuencias = response.result;
      },
      error: (error) => {
        this._messageService.showError(
          'ERROR en el listado de frecuencias: ' + error,
          'top center',
          5000
        );
      },
    });
  }

  get_AlimentosMinutaMAERReglas() {
    this._minutasApiService
      .get_AlimentosMinutaMAER(this.idMinutaPatronAlimento)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.itemComponent = response.result.alimentoMinutaAgrupado;
            this.dataSourceComponents =
              response.result.listGruposAlimentoMinutaAgrupado.filter(
                (grupo) => grupo.id != 99 && grupo.id != 5
              );
            this.dataComponentInPreparations =
              response.result.listGruposAlimentoMinutaAgrupado.filter(
                (grupo) => grupo.id == 99 || grupo.id == 5
              );
            //this.dataComponentInPreparations.reverse();
            this.valTotalRowsDataSourceComponentes();
            this.setTotalIntercambios();
            this.dataSourceComponentesMod.emit(this.dataSourceComponents);
            this.dataComponentInPreparationsMod.emit(
              this.dataComponentInPreparations
            );
          } else {
            this._messageService.showError(
              'ERROR: ' + response.error,
              'top center',
              5000
            );
            return;
          }

          this.dataSourceComponents.forEach((grupo) => {
            grupo.listSubGrupo = grupo.listSubGrupo.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
          });
        },
      });
  }

  valTotalRowsDataSourceComponentes() {
    this.dataSourceComponents.forEach((grupo) => {
      grupo.totalRows = grupo.listSubGrupo.length;
    });

    this.dataComponentInPreparations.forEach((grupo) => {
      grupo.totalRows = grupo.listSubGrupo.length;
    });
  }

  setTotalIntercambios() {
    this.dataSourceComponents.forEach((grupo) => {
      var totalInter: number = 0;
      var frecuenciahuevos = 0;
      var frecuenciaactual = 0;
      if (grupo.id == this.grupoMinutaMAER.GRASAS) {
        totalInter +=
          grupo.listSubGrupo[0].frecuencia *
          grupo.listSubGrupo[0].numIntercambios;
      } else {
        grupo.listSubGrupo.forEach((subGrupo) => {
          frecuenciaactual = subGrupo.frecuencia;
          if (this.TipoComplementoId == this.TipoComplementoAlmuerzo) {
            if (subGrupo.id == this.subgrupoMinutaMAER.HUEVOS) {
              frecuenciahuevos = subGrupo.frecuencia;
            }
            if (
              subGrupo.id ==
              this.subgrupoMinutaMAER
                .LEGUMINOSAS_COCIDAS_Y_MEZCLAS_VEGETALES_COCIDAS
            ) {
              frecuenciaactual = frecuenciahuevos;
            }
          }
          if (subGrupo.iD_TipoSentidoValidacion == 2) {
            totalInter += frecuenciaactual * subGrupo.numIntercambiosMax;
          } else {
            totalInter += frecuenciaactual * subGrupo.numIntercambios;
          }
        });
      }
      grupo.totalIntercambios = totalInter;
    });

    this.dataComponentInPreparations.forEach((grupo) => {
      var totalInter: number = 0;
      if (grupo.id == this.grupoMinutaMAER.GRASAS) {
        if (grupo.listSubGrupo[0].iD_TipoSentidoValidacion == 2) {
          totalInter +=
            grupo.listSubGrupo[0].frecuencia *
            grupo.listSubGrupo[0].numIntercambiosMax;
        } else {
          totalInter +=
            grupo.listSubGrupo[0].frecuencia *
            grupo.listSubGrupo[0].numIntercambios;
        }
      } else {
        grupo.listSubGrupo.forEach((subGrupo) => {
          //if (subGrupo.id != this.subgrupoMinutaMAER.HUEVOS)
          if (subGrupo.iD_TipoSentidoValidacion == 2) {
            totalInter += subGrupo.frecuencia * subGrupo.numIntercambiosMax;
          } else {
            totalInter += subGrupo.frecuencia * subGrupo.numIntercambios;
          }
        });
      }
      grupo.totalIntercambios = totalInter;
    });
  }

  changeModelMinuta(name: string, value: any, item: any) {
    item[name] = value;

    if (name == 'frecuencia') {
      for (let i = 0; i < this.listFrecuencias.length; i++) {
        if (this.listFrecuencias[i].id == value) {
          item['nombreFrecuencia'] = this.listFrecuencias[i].nombre;
          break;
        }
      }
    }
    this.setTotalIntercambios();
    this.dataSourceComponentesMod.emit(this.dataSourceComponents);
    this.dataComponentInPreparationsMod.emit(this.dataComponentInPreparations);
  }

  obtenerTotalIntercambios(): number {
    let totalIntercambios: number = this.dataComponentInPreparations?.reduce(
      (result, current) => {
        return result + current.totalIntercambios;
      },
      0
    );
    totalIntercambios += this.dataSourceComponents?.reduce(
      (result, current) => {
        return result + current.totalIntercambios;
      },
      0
    );
    return totalIntercambios;
  }

  obtenerNumeroDeFilasFrecuenciaPorSubgrupo(subgrupo: any): number {
    if (
      subgrupo.iD_Grupo ==
        this.grupoMinutaMAER
          .CARNES_HUEVOS_LEGUMINOSAS_SECAS_FRUTOS_SECOS_Y_SEMILLAS &&
      subgrupo.id == this.subgrupoMinutaMAER.HUEVOS
    ) {
      return 2;
    }
    return 1;
  }

  mostrarFrecuenciaPorSubgrupo(subgrupo: any): boolean {
    if (
      subgrupo.id !=
      this.subgrupoMinutaMAER.LEGUMINOSAS_COCIDAS_Y_MEZCLAS_VEGETALES_COCIDAS
    ) {
      return true;
    }
    return false;
  }
}
