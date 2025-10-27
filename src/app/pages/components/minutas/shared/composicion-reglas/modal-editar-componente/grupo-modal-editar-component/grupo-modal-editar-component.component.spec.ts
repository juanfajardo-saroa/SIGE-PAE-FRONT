import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoModalEditarComponentComponent } from './grupo-modal-editar-component.component';

describe('GrupoModalEditarComponentComponent', () => {
  let component: GrupoModalEditarComponentComponent;
  let fixture: ComponentFixture<GrupoModalEditarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoModalEditarComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoModalEditarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
