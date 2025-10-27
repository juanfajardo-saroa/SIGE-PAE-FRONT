import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.sass']
})
export class ChapterComponent implements OnInit {

  @Input() numberChapter: number = 0;
  @Input() titleChapter?: string;
  @Input() numberBadge?: string;

  constructor() { }

  ngOnInit(): void {}

}
