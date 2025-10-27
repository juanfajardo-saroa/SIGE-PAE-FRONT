import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ThemeRoutingModule  } from './theme-routing.module';
import { MenuAdminAutorizadoComponent } from '../seguridad/autorizado/menuadminautorizado.component';
import { MenuLateralAutorizadoComponent } from '../seguridad/autorizado/menulateralautorizado.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ThemeRoutingModule,
    ComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatMenuModule,
  ],
  exports: [MenuLateralAutorizadoComponent,MatCheckboxModule,MatIconModule,MatListModule, MatChipsModule],
  declarations: [
    AdminLayoutComponent,
    MenuAdminAutorizadoComponent,
    MenuLateralAutorizadoComponent
  ],
  entryComponents: [],
})


export class ThemeModule {}
