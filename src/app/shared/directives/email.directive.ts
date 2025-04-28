import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'input[emailChars],textarea[emailChars]',
  standalone: true
})


export class EmailDirective {
  private regex: RegExp = new RegExp('^[a-zA-Z0-9@_.]*$');

  constructor() { }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }
  }
