import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesEjecucionYSeguimientoComponent } from './aprobaciones-ejecucion-y-seguimiento.component';

describe('AprobacionesEjecucionYSeguimientoComponent', () => {
  let component: AprobacionesEjecucionYSeguimientoComponent;
  let fixture: ComponentFixture<AprobacionesEjecucionYSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionesEjecucionYSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesEjecucionYSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
