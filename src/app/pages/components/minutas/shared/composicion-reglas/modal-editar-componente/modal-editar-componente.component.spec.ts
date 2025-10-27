import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarComponenteComponent } from './modal-editar-componente.component';

describe('ModalEditarComponenteComponent', () => {
  let component: ModalEditarComponenteComponent;
  let fixture: ComponentFixture<ModalEditarComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarComponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear', () => {
    expect(component).toBeTruthy();
  });
});
