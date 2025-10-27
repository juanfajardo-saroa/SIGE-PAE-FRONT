import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesPlaneacionEInicioComponent } from './aprobaciones-planeacion-e-inicio.component';

describe('AprobacionesPlaneacionEInicioComponent', () => {
  let component: AprobacionesPlaneacionEInicioComponent;
  let fixture: ComponentFixture<AprobacionesPlaneacionEInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionesPlaneacionEInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesPlaneacionEInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
