import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsedesinternoComponent } from './tabsedesinterno.component';

describe('TabsedesinternoComponent', () => {
  let component: TabsedesinternoComponent;
  let fixture: ComponentFixture<TabsedesinternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsedesinternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsedesinternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente', () => {
    expect(component).toBeTruthy();
  });
});
