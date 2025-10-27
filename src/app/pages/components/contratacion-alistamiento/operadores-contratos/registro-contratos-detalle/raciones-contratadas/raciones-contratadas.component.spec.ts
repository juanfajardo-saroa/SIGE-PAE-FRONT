import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacionesContratadasComponent } from './raciones-contratadas.component';

describe('RacionesContratadasComponent', () => {
  let component: RacionesContratadasComponent;
  let fixture: ComponentFixture<RacionesContratadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacionesContratadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacionesContratadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
