import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPresupuestalConsultaComponent } from './informacion-presupuestal-consulta.component';

describe('InformacionPresupuestalConsultaComponent', () => {
  let component: InformacionPresupuestalConsultaComponent;
  let fixture: ComponentFixture<InformacionPresupuestalConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPresupuestalConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPresupuestalConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
