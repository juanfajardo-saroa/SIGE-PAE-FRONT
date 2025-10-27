import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoTotalTabComponent } from './costo-total-tab.component';

describe('CostoTotalTabComponent', () => {
  let component: CostoTotalTabComponent;
  let fixture: ComponentFixture<CostoTotalTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostoTotalTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoTotalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
