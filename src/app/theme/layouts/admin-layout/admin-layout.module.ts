import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

import { ComponentsModule  } from '../../components/components.module'
import { PagesComponent } from '../../../pages/pages.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuAutorizadoComponent } from 'src/app/seguridad/autorizado/menuautorizado.component';
import { MenuLateralAutorizadoComponent } from 'src/app/seguridad/autorizado/menulateralautorizado.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatChipsModule


  ],
  exports: [MatCheckboxModule,MatIconModule,MatListModule,MatChipsModule],
  declarations: [
    PagesComponent,
   // MenuLateralAutorizadoComponent



  ]
})

export class AdminLayoutModule {

}


