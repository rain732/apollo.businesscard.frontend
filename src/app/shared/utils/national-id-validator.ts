import { AbstractControl } from '@angular/forms';

export function NationalIdValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const id = control.value;

  if (!id || typeof id !== 'string') {
    return { invalid: true };
  }

  const idTrimmed = id.trim();

  if (idTrimmed.length !== 10 || isNaN(Number(idTrimmed))) {
    return { invalid: true };
  }

  const expectedType = '1'; // Type '1' is expected
  const type = idTrimmed.substr(0, 1);

  if (type !== expectedType) {
    return { invalid: true };
  }

  let sum = 0;

  for (let i = 0; i < 10; i++) {
    const digit = Number(idTrimmed[i]);
    if (i % 2 === 0) {
      const doubled = digit * 2;
      const ZFOdd = `00${doubled}`.slice(-2);
      sum += Number(ZFOdd[0]) + Number(ZFOdd[1]);
    } else {
      sum += digit;
    }
  }

  return sum % 10 === 0 ? null : { invalid: true };
}
