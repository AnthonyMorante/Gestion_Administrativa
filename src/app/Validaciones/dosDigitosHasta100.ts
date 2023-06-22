import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function dosDigitosHasta100(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const value = control.value;

    

    if (value === null || value === '') {
      return null; // Return null for optional field
    }

    if(parseFloat(value)>100){

        return { decimalWithTwoDigits: true }
    }

  
    const pattern = /^(0\.[1-9]\d*|[1-9]\d*|1)(\.\d{1,2})?$/;

    
    
    if (pattern.test(value)) {
      return null; // Validation passed
    } else {
      return { decimalWithTwoDigits: true }; // Validation failed
    }
   
  };
}
