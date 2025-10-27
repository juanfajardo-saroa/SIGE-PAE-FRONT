import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEtcDiagnosticosInfraestructuraComponent } from './resumen-etc-diagnosticos-infraestructura.component';

describe('ResumenEtcDiagnosticosInfraestructuraComponent', () => {
  let component: ResumenEtcDiagnosticosInfraestructuraComponent;
  let fixture: ComponentFixture<ResumenEtcDiagnosticosInfraestructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenEtcDiagnosticosInfraestructuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenEtcDiagnosticosInfraestructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
