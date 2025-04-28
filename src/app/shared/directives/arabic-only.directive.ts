import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../utils/utils';

@Directive({
  selector: 'input[arabicOnly],textarea[arabicOnly]',
  standalone: true
})
//allow input text only ,will return false when user insert number or any specail characters
//السماح للمستخدم بإدخال حروف عربيةوارقام فقط
//usage:: <input  type="text"  arabicOnly />
//يفضل إستخدامها مع ال  <input  type="text"



export class ArabicOnlyDirective {
  @Output() valueChange = new EventEmitter()
    constructor(private _el: ElementRef) { }
    @HostListener('keypress', ['$event']) onKeyPress(event:any) {
      return Utils.isArabicLettersAndNumbers(event.key);
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
      const pastedText = event?.clipboardData?.getData('text');
      if(!Utils.isArabicLettersAndNumbers(pastedText ?? ''))
      {
        event.preventDefault();
      }
    }
  }
