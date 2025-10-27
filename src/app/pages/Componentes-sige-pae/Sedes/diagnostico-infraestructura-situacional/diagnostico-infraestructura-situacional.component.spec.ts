import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoInfraestructuraSituacionalComponent } from './diagnostico-infraestructura-situacional.component';

describe('DiagnosticoInfraestructuraSituacionalComponent', () => {
  let component: DiagnosticoInfraestructuraSituacionalComponent;
  let fixture: ComponentFixture<DiagnosticoInfraestructuraSituacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticoInfraestructuraSituacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoInfraestructuraSituacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
