import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterAzulBgComponent } from './chapter-azul-bg.component';

describe('ChapterAzulBgComponent', () => {
  let component: ChapterAzulBgComponent;
  let fixture: ComponentFixture<ChapterAzulBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterAzulBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterAzulBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente ', () => {
    expect(component).toBeTruthy();
  });
});
