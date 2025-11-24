import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creation-action-button',
  templateUrl: './creation-action-button.component.html',
  styleUrls: ['./creation-action-button.component.scss']
})
export class CreationActionButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = 'add';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}