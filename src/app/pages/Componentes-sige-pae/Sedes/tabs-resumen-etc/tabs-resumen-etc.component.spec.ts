import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsResumenEtcComponent } from './tabs-resumen-etc.component';

describe('TabsResumenEtcComponent', () => {
  let component: TabsResumenEtcComponent;
  let fixture: ComponentFixture<TabsResumenEtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsResumenEtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsResumenEtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
