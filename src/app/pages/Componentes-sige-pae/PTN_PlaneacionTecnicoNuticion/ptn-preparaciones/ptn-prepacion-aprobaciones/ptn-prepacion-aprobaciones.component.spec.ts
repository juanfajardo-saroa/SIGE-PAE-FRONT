import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnPrepacionAprobacionesComponent } from './ptn-prepacion-aprobaciones.component';

describe('PtnPrepacionAprobacionesComponent', () => {
  let component: PtnPrepacionAprobacionesComponent;
  let fixture: ComponentFixture<PtnPrepacionAprobacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnPrepacionAprobacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnPrepacionAprobacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
