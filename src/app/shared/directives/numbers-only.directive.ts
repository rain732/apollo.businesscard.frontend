import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Utils } from '../utils/utils';

@Directive({
  selector: 'input[numbersOnly]',
  standalone: true
})
//allow input number only ,will return false when user insert text or any specail characters
//السماح للمستخدم بإدخال أرقام فقط بدون وحروف أوعلامات خاصة

//usage:: <input  type="text"  numbersOnly/>
//يفضل إستخدامها مع ال  <input  type="text"
export class NumberOnlyDirective {

  @Output() valueChange = new EventEmitter()
  constructor(private _el: ElementRef) { }
  @HostListener('keypress', ['$event']) onKeyPress(event:any) {
    return  Utils.isOnlyNumbers(event.key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedText = event?.clipboardData?.getData('text');
    if(!Utils.isOnlyNumbers(pastedText ?? ''))
    {
      event.preventDefault();
    }
  }
}
