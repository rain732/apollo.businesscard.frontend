import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { RequestFormReceivers } from '../../models/request/form/request-form-receivers-model';
import { RequestFormReceiverTypeEnum } from '../../enums/request-form-receiver-type.enum';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { PasswordNoMatch: true };
};

export function validateReceivers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const receivers: RequestFormReceivers[] = control.value || [];

      const originalReceivers = receivers.filter(
        (x) => x.typeId === RequestFormReceiverTypeEnum.Original
      );
      const copyReceivers = receivers.filter(
        (x) => x.typeId === RequestFormReceiverTypeEnum.Copy
      );

      if (originalReceivers.length !== 1) {
        return {
          originalReceiverError: true,
        };
      }

      if (copyReceivers.length < 1 || copyReceivers.length > 4) {
        return {
          copyReceiverError: true,
        };
      }

      return null;
    };
  };
