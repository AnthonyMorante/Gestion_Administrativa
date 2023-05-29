import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function cedulaRuc(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const cedulaPattern = /^[0-9]{10}$/;
    const rucPattern = /^[0-9]{13}$/;

    if (!cedulaPattern.test(value) && !rucPattern.test(value)) {
      return { ecuadorCedulaRuc: true };
    }

    // Validate Cedula number
    if (cedulaPattern.test(value)) {
      const provinceCode = Number(value.substr(0, 2));
      if (provinceCode < 1 || provinceCode > 24) {
        return { ecuadorCedulaRuc: true };
      }

      const thirdDigit = Number(value.substr(2, 1));
      if (thirdDigit < 0 || thirdDigit > 5) {
        return { ecuadorCedulaRuc: true };
      }

      // Calculate the check digit
      const checkDigit = Number(value.substr(9, 1));
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        const digit = Number(value.charAt(i));
        if (i % 2 === 0) {
          const double = digit * 2;
          sum += double > 9 ? double - 9 : double;
        } else {
          sum += digit;
        }
      }
      const calculatedCheckDigit = 10 - (sum % 10);
      const isValid = (calculatedCheckDigit === 10 && checkDigit === 0) || calculatedCheckDigit === checkDigit;
      if (!isValid) {
        return { ecuadorCedulaRuc: true };
      }
    }

    // Validate RUC number
    if (rucPattern.test(value)) {
      const thirdDigit = Number(value.charAt(2));
      if (thirdDigit < 0 || thirdDigit > 6) {
        return { ecuadorCedulaRuc: true };
      }

      const checkDigit = Number(value.charAt(9));
      let sum = 0;
      let multiplier = 2;
      for (let i = 0; i < 8; i++) {
        const digit = Number(value.charAt(i));
        sum += digit * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }
      const remainder = sum % 11;
      const calculatedCheckDigit = remainder === 0 ? 0 : 11 - remainder;
      const isValid = calculatedCheckDigit === checkDigit;
      if (!isValid) {
        return { ecuadorCedulaRuc: true };
      }
    }

    return null;
  };
}
