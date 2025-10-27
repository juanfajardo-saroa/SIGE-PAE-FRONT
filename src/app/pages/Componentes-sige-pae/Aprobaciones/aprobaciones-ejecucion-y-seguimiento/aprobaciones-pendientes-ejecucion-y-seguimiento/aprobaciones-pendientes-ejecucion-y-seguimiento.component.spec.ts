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


import { AprobacionesPendientesEjecucionYSeguimientoComponent } from './aprobaciones-pendientes-ejecucion-y-seguimiento.component';

describe('AprobacionesPendientesEjecucionYSeguimientoComponent', () => {
  let component: AprobacionesPendientesEjecucionYSeguimientoComponent;
  let fixture: ComponentFixture<AprobacionesPendientesEjecucionYSeguimientoComponent>;

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
      declarations: [ AprobacionesPendientesEjecucionYSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesPendientesEjecucionYSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
