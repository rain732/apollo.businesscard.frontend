import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Utils } from '../utils/utils';

@Directive({
  selector: 'input[textOnly],textarea[textOnly]',
  standalone: true
})
//allow input text only ,will return false when user insert number or any specail characters
//السماح للمستخدم بإدخال حروف فقط بدون أرقام او علامات خاصة
//usage:: <input  type="text"  textOnly />
//يفضل إستخدامها مع ال  <input  type="text"



export class TextOnlyDirective {
  @Output() valueChange = new EventEmitter()
    constructor(private _el: ElementRef) { }
    @HostListener('keypress', ['$event']) onKeyPress(event:any) {
      return Utils.isLettersOnly(event.key);
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
      const pastedText = event?.clipboardData?.getData('text');
      if(!Utils.isLettersOnly(pastedText ?? ''))
      {
        event.preventDefault();
      }
    }
  }
