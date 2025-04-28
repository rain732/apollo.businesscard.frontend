import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../utils/utils';

@Directive({
  selector: 'input[arabicLettersOnly],textarea[arabicLettersOnly]',
  standalone: true
})
//allow input arabic characters text only ,will return false when user insert number or any specail characters
//السماح للمستخدم بإدخال حروف عربية فقط
//usage:: <input  type="text"  arabicLettersOnly />
//يفضل إستخدامها مع ال  <input  type="text"



export class ArabicLettersOnlyDirective {
  @Output() valueChange = new EventEmitter()
    constructor(private _el: ElementRef) { }
    @HostListener('keypress', ['$event']) onKeyPress(event:any) {
      return Utils.isArabicLetters(event.key);
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
      const pastedText = event?.clipboardData?.getData('text');
      if(!Utils.isArabicLetters(pastedText ?? ''))
      {
        event.preventDefault();
      }
    }
  }
