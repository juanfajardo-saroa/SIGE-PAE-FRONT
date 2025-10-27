import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/***  Modulos Propios **/
import { SemaforoPipe } from './pipes/semafono.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { FiltroInputPipe } from './pipes/filtro-input.pipe';
import { PeriodicidadPipe } from './pipes/periodicidad.pipe';
import { SemaforoContratosPipe } from './pipes/semaforo-contratos.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe'

@NgModule({
  declarations: [    
    SemaforoPipe, 
    HighlightDirective, FiltroInputPipe, PeriodicidadPipe, SemaforoContratosPipe, DateFormatPipe
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    SemaforoPipe,
    HighlightDirective,
    FiltroInputPipe,
    PeriodicidadPipe,
    SemaforoContratosPipe,
    DateFormatPipe
  ]
})

export class LibrariesModule { }
