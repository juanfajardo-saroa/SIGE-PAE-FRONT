/**
 * Archivo de especificaciones de pruebas unitarias para los archivos de origen del componente
 *
 *
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListPesoNetoPreparacionComponent } from './list-PesoNetoPreparacion.component';


describe('ListPesoNetoPreparacionComponent', () => {
  let component: ListPesoNetoPreparacionComponent;
  let fixture: ComponentFixture<ListPesoNetoPreparacionComponent>;

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
		declarations: [ ListPesoNetoPreparacionComponent ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPesoNetoPreparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});

