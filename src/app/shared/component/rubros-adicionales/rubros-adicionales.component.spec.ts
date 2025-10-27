import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosAdicionalesComponent } from './rubros-adicionales.component';

describe('RubrosAdicionalesComponent', () => {
  let component: RubrosAdicionalesComponent;
  let fixture: ComponentFixture<RubrosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubrosAdicionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
