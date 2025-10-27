import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEjecucionYSeguimientoComponent } from './tab-ejecucion-y-seguimiento.component';

describe('TabEjecucionYSeguimientoComponent', () => {
  let component: TabEjecucionYSeguimientoComponent;
  let fixture: ComponentFixture<TabEjecucionYSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEjecucionYSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEjecucionYSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
