import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionRutaComponent } from './informacion-ruta.component';

describe('InformacionRutaComponent', () => {
  let component: InformacionRutaComponent;
  let fixture: ComponentFixture<InformacionRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionRutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
