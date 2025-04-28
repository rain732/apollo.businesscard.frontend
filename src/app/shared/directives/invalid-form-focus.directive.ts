import { Directive, HostListener, Input, ElementRef } from '@angular/core';
@Directive({
  selector: '[appFocus]',
  standalone: true
})
export class FocusDirective {
  constructor(private el: ElementRef) {}
  @Input() formGroup: any;
  @HostListener('submit', ['$event'])
  public onSubmit(event: any): void {
    const formControls = this.formGroup.controls;
    const invalidInputs = [];
    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName)) {
        const control = formControls[controlName];
        if (control.invalid) {
          invalidInputs.push(this.el.nativeElement.querySelector(`[formControlName="${controlName}"]`));
        }
      }
    }
    if ('INVALID' === this.formGroup.status) {
      event.preventDefault();
      const formGroupInvalid =
        this.el.nativeElement.querySelectorAll('.ng-invalid');
      if (formGroupInvalid.length > 0) {
        formGroupInvalid.forEach((ele : HTMLElement) => {
          if (ele.querySelectorAll('.ng-invalid').length > 0) {
            const formelement = ele.querySelectorAll('.ng-invalid');
            if (formelement[0].tagName.toLowerCase() === 'ng-select') {
              const inp = formelement[0].querySelectorAll('input');
               inp[0].focus();
            } else {
              (<HTMLInputElement>formelement[0]).focus();
            }
          } else {
            (<HTMLInputElement>formGroupInvalid[0]).focus();
          }
        });
      }
    }
  }
}
