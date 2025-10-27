import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostosPaeComponent } from './costos-pae.component';

describe('CostosPaeComponent', () => {
  let component: CostosPaeComponent;
  let fixture: ComponentFixture<CostosPaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostosPaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostosPaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
