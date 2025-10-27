import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const ValidateMayorCero = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = control.value <= 0 || control.value == '0';
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    }
}

