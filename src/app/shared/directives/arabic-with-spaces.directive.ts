import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../utils/utils';

@Directive({
  selector: 'input[arabicWithSpaces],textarea[arabicWithSpaces]',
  standalone: true
})
//allow input text only ,will return false when user insert number or any specail characters
//السماح للمستخدم بإدخال حروف عربيةوارقام فقط
//usage:: <input  type="text"  arabicWithSpaces />
//يفضل إستخدامها مع ال  <input  type="text"



export class ArabicWithSpacesDirective {
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
