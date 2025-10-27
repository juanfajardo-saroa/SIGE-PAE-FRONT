import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-semaforo',
  templateUrl: './semaforo.component.html',
  styleUrls: ['./semaforo.component.sass']
})
export class SemaforoComponent implements OnInit {

  @Input() bgColor: string = '';
  @Input() texto: string = '';
  @Input() align: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
