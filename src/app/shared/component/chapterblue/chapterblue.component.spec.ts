import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterblueComponent } from './chapterblue.component';

describe('ChapterblueComponent', () => {
  let component: ChapterblueComponent;
  let fixture: ComponentFixture<ChapterblueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterblueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterblueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente ', () => {
    expect(component).toBeTruthy();
  });
});
