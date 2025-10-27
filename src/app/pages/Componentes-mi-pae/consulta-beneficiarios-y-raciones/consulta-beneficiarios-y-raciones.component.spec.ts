

import { ConsultaBeneficiariosYRacionesComponent } from './consulta-beneficiarios-y-raciones.component';
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




describe('ConsultaBeneficiariosYRacionesComponent', () => {
  let component: ConsultaBeneficiariosYRacionesComponent;
  let fixture: ComponentFixture<ConsultaBeneficiariosYRacionesComponent>;

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

      declarations: [ ConsultaBeneficiariosYRacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaBeneficiariosYRacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});



