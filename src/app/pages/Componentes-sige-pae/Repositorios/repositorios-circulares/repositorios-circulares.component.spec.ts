import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriosCircularesComponent } from './repositorios-circulares.component';

describe('RepositoriosCircularesComponent', () => {
  let component: RepositoriosCircularesComponent;
  let fixture: ComponentFixture<RepositoriosCircularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoriosCircularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriosCircularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
