import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTNProductosComponent } from './ptn-productos.component';

describe('PTNProductosComponent', () => {
  let component: PTNProductosComponent;
  let fixture: ComponentFixture<PTNProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PTNProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PTNProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
