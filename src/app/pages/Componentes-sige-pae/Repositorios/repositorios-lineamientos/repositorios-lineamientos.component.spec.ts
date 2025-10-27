import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriosLineamientosComponent } from './repositorios-lineamientos.component';

describe('RepositoriosLineamientosComponent', () => {
  let component: RepositoriosLineamientosComponent;
  let fixture: ComponentFixture<RepositoriosLineamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoriosLineamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriosLineamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
