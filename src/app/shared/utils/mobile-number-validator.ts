import { AbstractControl, Validators } from '@angular/forms';

export function MobileNumberValidator(control: AbstractControl): { [key: string]: any } | null {
  const number = control.value;

  if (number === null || number === undefined || number.trim() === '') return Validators.nullValidator(control);

  const numberTrimmed = number.trim();
  if (!/^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/.test(numberTrimmed)) {
    return { invalid: true };
  }

  return null;
}
