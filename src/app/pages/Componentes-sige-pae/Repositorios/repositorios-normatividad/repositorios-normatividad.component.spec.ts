import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriosNormatividadComponent } from './repositorios-normatividad.component';

describe('RepositoriosNormatividadComponent', () => {
  let component: RepositoriosNormatividadComponent;
  let fixture: ComponentFixture<RepositoriosNormatividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoriosNormatividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriosNormatividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
