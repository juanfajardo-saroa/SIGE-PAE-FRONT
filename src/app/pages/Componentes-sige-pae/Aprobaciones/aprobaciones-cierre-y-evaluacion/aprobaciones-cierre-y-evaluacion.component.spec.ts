import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesCierreYEvaluacionComponent } from './aprobaciones-cierre-y-evaluacion.component';

describe('AprobacionesCierreYEvaluacionComponent', () => {
  let component: AprobacionesCierreYEvaluacionComponent;
  let fixture: ComponentFixture<AprobacionesCierreYEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionesCierreYEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesCierreYEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
