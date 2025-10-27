import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlistamientoComponent } from './registro-alistamiento.component';

describe('RegistroAlistamientoComponent', () => {
  let component: RegistroAlistamientoComponent;
  let fixture: ComponentFixture<RegistroAlistamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAlistamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAlistamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
