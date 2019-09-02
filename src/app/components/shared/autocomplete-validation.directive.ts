import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appAutocompleteValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: AutocompleteValidationDirective, multi: true}]
})
export class AutocompleteValidationDirective implements Validator{
  constructor() { }

  validate(control: AbstractControl){
    return autocompleteValidator(control)
  }

}

export const autocompleteValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  console.log("directiva")
  const input = control.get('basicInput');
  const selection: any = input.value;
  if(typeof selection !== 'string'){
    return {incorrect: true};   
  }
}
