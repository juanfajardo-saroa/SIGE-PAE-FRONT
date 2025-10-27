import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-azul-bg',
  templateUrl: './chapter-azul-bg.component.html',
  styleUrls: ['./chapter-azul-bg.component.sass']
})
export class ChapterAzulBgComponent implements OnInit {

  @Input() numberChapter: number = 1;
  @Input() titleChapter?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
