import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnDisregistroComponent } from './ptn-disregistro.component';

describe('PtnDisregistroComponent', () => {
  let component: PtnDisregistroComponent;
  let fixture: ComponentFixture<PtnDisregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnDisregistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnDisregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
