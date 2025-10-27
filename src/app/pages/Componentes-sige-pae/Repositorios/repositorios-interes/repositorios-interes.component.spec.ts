import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriosInteresComponent } from './repositorios-interes.component';

describe('RepositoriosInteresComponent', () => {
  let component: RepositoriosInteresComponent;
  let fixture: ComponentFixture<RepositoriosInteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoriosInteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriosInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
