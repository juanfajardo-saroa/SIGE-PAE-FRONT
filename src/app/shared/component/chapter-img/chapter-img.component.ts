import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter-img',
  templateUrl: './chapter-img.component.html'
})
export class ChapterImgComponent implements OnInit {

  @Input() chapterIcon: string = '';
  @Input() chapterText: string = 'Sele';

  constructor() { }

  ngOnInit(): void {
  }

}
