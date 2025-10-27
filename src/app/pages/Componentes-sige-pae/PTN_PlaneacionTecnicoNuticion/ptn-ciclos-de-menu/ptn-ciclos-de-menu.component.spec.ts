import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTNCiclosDeMenuComponent } from './ptn-ciclos-de-menu.component';

describe('PTNCiclosDeMenuComponent', () => {
  let component: PTNCiclosDeMenuComponent;
  let fixture: ComponentFixture<PTNCiclosDeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PTNCiclosDeMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PTNCiclosDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
