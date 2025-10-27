import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent implements OnInit {

  @Input() aligment: string = 'H';
  @Input() imgSize: string = '';
  @Input() textSize: string = '';
  @Input() textColor: string = '';
  @Input() message: string = '';
  @Input() tipoMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
