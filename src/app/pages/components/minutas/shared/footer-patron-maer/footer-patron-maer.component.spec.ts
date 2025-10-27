import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPatronMaerComponent } from './footer-patron-maer.component';

describe('FooterPatronMaerComponent', () => {
  let component: FooterPatronMaerComponent;
  let fixture: ComponentFixture<FooterPatronMaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPatronMaerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPatronMaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
