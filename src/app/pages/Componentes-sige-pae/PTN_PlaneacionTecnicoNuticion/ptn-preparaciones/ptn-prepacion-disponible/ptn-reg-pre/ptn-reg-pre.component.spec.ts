import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtnRegPreComponent } from './ptn-reg-pre.component';

describe('PtnRegPreComponent', () => {
  let component: PtnRegPreComponent;
  let fixture: ComponentFixture<PtnRegPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtnRegPreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnRegPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
