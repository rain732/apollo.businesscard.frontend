import { AbstractControl, Validators } from '@angular/forms';

export function EmailValidator(control: AbstractControl): { [key: string]: any } | null {
  const email = control.value;

  if (email === null || email === undefined || email.trim() === '') return Validators.nullValidator(control);

  const emailTrimmed = email.trim();

  const test = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed);
  return !test ? { invalid: true } : null;
}
