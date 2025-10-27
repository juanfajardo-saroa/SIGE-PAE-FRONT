import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapterblue',
  templateUrl: './chapterblue.component.html',
  styleUrls: ['./chapterblue.component.sass']
})
export class ChapterblueComponent implements OnInit {


  @Input() numberChapter: number = 1;
  @Input() titleChapter?: string;
  @Input() stringChapter?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
