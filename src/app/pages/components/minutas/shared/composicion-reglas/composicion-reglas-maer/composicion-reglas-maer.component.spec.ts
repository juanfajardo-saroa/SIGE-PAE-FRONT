import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposicionReglasMaerComponent } from './composicion-reglas-maer.component';

describe('ComposicionReglasMaerComponent', () => {
  let component: ComposicionReglasMaerComponent;
  let fixture: ComponentFixture<ComposicionReglasMaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposicionReglasMaerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposicionReglasMaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
