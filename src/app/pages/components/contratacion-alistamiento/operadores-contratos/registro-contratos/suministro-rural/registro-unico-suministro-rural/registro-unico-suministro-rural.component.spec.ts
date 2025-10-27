import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUnicoSuministroRuralComponent } from './registro-unico-suministro-rural.component';

describe('RegistroUnicoSuministroRuralComponent', () => {
  let component: RegistroUnicoSuministroRuralComponent;
  let fixture: ComponentFixture<RegistroUnicoSuministroRuralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUnicoSuministroRuralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUnicoSuministroRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
