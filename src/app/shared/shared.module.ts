import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import {LibrariesModule} from './libraries/libraries.module';
import {ChapterComponent} from './component/chapter/chapter.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import { ChapterAzulComponent } from './component/chapter-azul/chapter-azul.component';

import { ChapterblueComponent } from './component/chapterblue/chapterblue.component';
import { AlertMessageComponent } from './component/alert-message/alert-message.component';
import { ChapterAzulBgComponent } from './component/chapter-azul-bg/chapter-azul-bg.component';
import { SemaforoComponent } from './component/semaforo/semaforo.component';
import { TituloTabComponent } from './component/titulo-tab/titulo-tab.component';
import { CostoTotalTabComponent } from './component/costo-total-tab/costo-total-tab.component';
import { ChapterImgComponent } from './component/chapter-img/chapter-img.component';
import { InfoMessageComponent } from './component/info-message/info-message.component';
import { TableJornadaPsCctCualificadoComponent } from './component/tables/table-jornada-ps-cct-cualificado/table-jornada-ps-cct-cualificado.component';
import { TableJornadaCostoComponent } from './component/tables/table-jornada-costo/table-jornada-costo.component';


@NgModule({
    imports: [
      LibrariesModule,
      MatProgressSpinnerModule,
      CommonModule,
      FormsModule
    ],
    exports: [
      LibrariesModule,
      ChapterComponent,
      ChapterAzulComponent,
      SpinnerComponent,
      ChapterblueComponent,
      AlertMessageComponent,
      ChapterAzulBgComponent,
      SemaforoComponent,
      TituloTabComponent,
      CostoTotalTabComponent,
      ChapterImgComponent,
      TableJornadaPsCctCualificadoComponent,
      TableJornadaCostoComponent
    ],
    declarations: [
      ChapterComponent, SpinnerComponent, ChapterAzulComponent,ChapterblueComponent,
      AlertMessageComponent,ChapterAzulBgComponent,SemaforoComponent, TituloTabComponent, CostoTotalTabComponent, ChapterImgComponent, InfoMessageComponent, TableJornadaPsCctCualificadoComponent, TableJornadaCostoComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    entryComponents: [],
  })

export class SharedModule {}
