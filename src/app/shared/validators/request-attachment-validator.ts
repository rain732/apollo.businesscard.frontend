import { ValidatorFn, AbstractControl, ValidationErrors, FormArray, FormGroup } from "@angular/forms";
import { RequestAttachmentEditBrief } from "../../models/request/request-attachment-brief";

  export function fileRequiredIfMandatoryValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const group = formGroup as FormGroup;
      
      // Extract controls
      const fileControl = group.get('file');
      const isMandatoryControl = group.get('isMandatory');
      const isUpdatedControl = group.get('isUpdated');
      
      // Perform validation
      if (isMandatoryControl?.value 
        && isUpdatedControl?.value 
        && !fileControl?.value) {
        return { fileRequired: true };
      }
  
      return null;
    };
  }