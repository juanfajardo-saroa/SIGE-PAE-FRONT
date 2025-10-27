import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  // defaultColor =  'rgb(211, 211, 211)'; // lightgray

  // @Input('highlight') bgColor = '';


  constructor(private eleRef: ElementRef) { 
    eleRef.nativeElement.style.background = '#ED0057';
    eleRef.nativeElement.style.color = '#ffffff';
  }

  
}
