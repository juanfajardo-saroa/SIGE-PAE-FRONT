import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import { RolMenuComponent } from './rol/rol.component';
import { NavbarComponent, RolesContent } from './navbar/navbar.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule} from '@angular/material/badge';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MenuAutorizadoComponent } from 'src/app/seguridad/autorizado/menuautorizado.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { SpinnerComponent } from 'src/app/shared/component/spinner/spinner.component';
//import { MenuService } from '../services/menu.service'
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatChipsModule,
    MatTabsModule,
    MatDividerModule,
    MatBadgeModule

  ],
  declarations: [
    FooterComponent,
    RolMenuComponent,
    NavbarComponent,
    RolesContent,
    MenubarComponent,
    MenuAutorizadoComponent,
   // SpinnerComponent

  ],
  exports: [
    FooterComponent,
    //RolMenuComponent,
    NavbarComponent,
    MenubarComponent,
    //SpinnerComponent
  ],
  entryComponents: [],
  providers: [
    //MenuService
  ]
})

export class ComponentsModule { }
