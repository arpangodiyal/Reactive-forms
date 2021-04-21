import { AbstractControl, FormGroup } from "@angular/forms";

export function passwordValidator(formGroup: FormGroup):{[key:string]:boolean} | null{
  return formGroup.controls.password.value === formGroup.controls.confirmPassword.value ?
  null : {'passwordMismatch':true}
}