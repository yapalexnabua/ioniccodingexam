import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
  
export const horseAgeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const age = control.get('age');

    return age?.value % 2 != 0 ? null : { notodd: true };
};
