import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-azul',
  templateUrl: './chapter-azul.component.html',
  styleUrls: ['./chapter-azul.component.sass']
})
export class ChapterAzulComponent implements OnInit {

  @Input() numberChapter: number = 1;
  @Input() titleChapter?: string;
  @Input() numberBadge?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
