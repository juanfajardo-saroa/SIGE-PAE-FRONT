import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosAcordadosComponent } from './precios-acordados.component';

describe('PreciosAcordadosComponent', () => {
  let component: PreciosAcordadosComponent;
  let fixture: ComponentFixture<PreciosAcordadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosAcordadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosAcordadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
