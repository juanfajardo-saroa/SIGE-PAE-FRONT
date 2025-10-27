
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





import { NavbarComponent } from './navbar.component';

// import { Component, ElementRef, Output, EventEmitter, OnInit, OnChanges,  } from '@angular/core';
// import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
// import { MenubarComponent } from '../../../theme/components/menubar/menubar.component';
 import { SeguridadService } from 'src/app/seguridad/seguridad.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
 import { AspNetUserRolesService } from 'src/app/shared/services/AspNetUserRoles.services';
// import { AspNetRolesModel } from 'src/app/shared/model/AspNetRoles';
 import { AspNetRolesService } from "src/app/shared/services/AspNetRoles.services";
// import { AspNetUserRolesModel } from 'src/app/shared/model/AspNetUserRoles';
 import { MenuService } from 'src/app/shared/services/Menu.services';
// import { MenuModel } from 'src/app/shared/model/Menu';
// import { RolMenuComponent } from '../rol/rol.component';
// import { environment } from 'src/environments/environment';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ SeguridadService,
        AspNetUserRolesService,
        AspNetRolesService,
        MenuService
       ],
      declarations: [ NavbarComponent ],
     
      imports: [ HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatMenuModule
      
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
