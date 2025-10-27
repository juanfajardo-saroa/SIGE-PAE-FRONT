import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEtcComponent } from './resumen-etc.component';

describe('ResumenEtcComponent', () => {
  let component: ResumenEtcComponent;
  let fixture: ComponentFixture<ResumenEtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenEtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenEtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
