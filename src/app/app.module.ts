import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './theme/theme.component';

//
import { SpinnerComponent } from './shared/spinner.component';


import { DatePipe } from '@angular/common';
import { NgbDatepickerModule, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, matSnackBarAnimations, MatSnackBarModule, } from '@angular/material/snack-bar';
import { SISPAEInterceptor } from './interceptors/interceptor';
// Importaciones requeridas para traduccion y mensajes en espanol
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeCO from '@angular/common/locales/es-CO';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
registerLocaleData(localeCO, 'es-CO')
// importaciones componente de seguridad
//import { AutorizadoModule } from './seguridad/autorizado/autorizado.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule,
    //

    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatTableExporterModule,
    // DatePipe,
    NgbDatepickerModule,
    MatListModule,
    MatChipsModule,
    //  ListZonasComponent,
    //  DialogZonasContent,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    //    AutorizadoModule,

  ],
  exports: [
    MatCheckboxModule,
    MatListModule,
    MatChipsModule
  ],
  declarations: [
    AppComponent,
    ThemeComponent,
    SpinnerComponent,

    //   LoginComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [


    {
      provide: HTTP_INTERCEPTORS,
      useClass: SISPAEInterceptor,
      multi: true,
    },
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-CO' }

  ],
  entryComponents: [],
  bootstrap: [AppComponent],
 
})

export class AppModule { }
