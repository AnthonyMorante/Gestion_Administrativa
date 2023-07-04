import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function dosDigitos(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const value = control.value;
    if (value === null || value === '') {
      return null; // Return null for optional field
    }
    
    // Regular expression pattern for decimal number with two digits after the comma
    // const pattern = /^([1-9]\d*|1)(\.\d{1,2})?$/;
    const pattern = /^(0\.[1-9]\d*|[1-9]\d*|1)(\.\d{1,2})?$/;

    
    
    if (pattern.test(value)) {
      return null; // Validation passed
    } else {
      return { decimalWithTwoDigits: true }; // Validation failed
    }
   
  };
}
