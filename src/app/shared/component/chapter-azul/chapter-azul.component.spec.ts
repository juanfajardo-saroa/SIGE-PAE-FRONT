import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterAzulComponent } from './chapter-azul.component';

describe('ChapterAzulComponent', () => {
  let component: ChapterAzulComponent;
  let fixture: ComponentFixture<ChapterAzulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterAzulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterAzulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente ', () => {
    expect(component).toBeTruthy();
  });
});
