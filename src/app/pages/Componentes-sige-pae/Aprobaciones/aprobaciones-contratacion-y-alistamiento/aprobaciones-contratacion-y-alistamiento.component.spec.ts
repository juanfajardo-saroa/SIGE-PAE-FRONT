import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesContratacionYAlistamientoComponent } from './aprobaciones-contratacion-y-alistamiento.component';

describe('AprobacionesContratacionYAlistamientoComponent', () => {
  let component: AprobacionesContratacionYAlistamientoComponent;
  let fixture: ComponentFixture<AprobacionesContratacionYAlistamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionesContratacionYAlistamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesContratacionYAlistamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
