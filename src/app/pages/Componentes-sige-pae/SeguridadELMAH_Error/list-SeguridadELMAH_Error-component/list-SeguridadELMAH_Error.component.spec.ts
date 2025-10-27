/**
 * Archivo de especificaciones de pruebas unitarias para los archivos de origen del componente
 *
 * 
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListSeguridadELMAH_ErrorComponent } from './list-SeguridadELMAH_Error.component';


describe('ListSeguridadELMAH_ErrorComponent', () => {
  let component: ListSeguridadELMAH_ErrorComponent;
  let fixture: ComponentFixture<ListSeguridadELMAH_ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
		imports: [ HttpClientTestingModule,
                RouterTestingModule,
                BrowserModule,
                ReactiveFormsModule,
                FormsModule,
                MatDialogModule,
                MatMenuModule,
                MatPaginatorModule,
                MatSortModule,
                BrowserAnimationsModule
                
      
      ],
		declarations: [ ListSeguridadELMAH_ErrorComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSeguridadELMAH_ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});

 