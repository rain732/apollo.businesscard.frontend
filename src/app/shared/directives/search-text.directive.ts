import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Utils } from '../utils/utils';

@Directive({
  selector: 'input[searchText],textarea[searchText],ng-select[searchText]',
  standalone: true,
})

// Allow input of numbers and alphabets with some special characters like -_ and .
// السماح بإدخال الأرقام والحروف الهجائية مع بعض الرموز الخاصة مثل( - _  . @)
// Usage: <input type="text" searchText />
// يفضل استخدامها مع <input type="text"
export class SearchTextDirective {
  @Output() valueChange = new EventEmitter();

  constructor(private _el: ElementRef) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    return Utils.isSearchValid(event.key);
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedText = event?.clipboardData?.getData('text');
    if (!Utils.isSearchValid(pastedText ?? '')) {
      event.preventDefault();
    }
  }
}
