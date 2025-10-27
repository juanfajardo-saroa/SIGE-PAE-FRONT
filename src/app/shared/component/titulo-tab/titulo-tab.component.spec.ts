import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloTabComponent } from './titulo-tab.component';

describe('TituloTabComponent', () => {
  let component: TituloTabComponent;
  let fixture: ComponentFixture<TituloTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TituloTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
