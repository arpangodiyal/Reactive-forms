import { AbstractControl, ValidatorFn } from "@angular/forms";

export function nameValidator(forbiddenName: RegExp): ValidatorFn{
  return function forbiddenNameValidator(control: AbstractControl):{[key: string]: any} | null{
    return forbiddenName.test(control.value) ? {'forbiddenName':'Name not allowed'} : null;
  }
}