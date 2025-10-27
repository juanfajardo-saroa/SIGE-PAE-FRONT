import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuministroRuralComponent } from './suministro-rural.component';

describe('SuministroRuralComponent', () => {
  let component: SuministroRuralComponent;
  let fixture: ComponentFixture<SuministroRuralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuministroRuralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministroRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
