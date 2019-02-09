import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[dateLimitation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: StartDateLimitationDirective, multi: true }]
})
export class StartDateLimitationDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return dateValidator(control)
  }

  constructor() {
  }
}

export const dateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startDate = control.get('startDate');
  const endDate = control.get('endDate');
  if (startDate == null || endDate == null)
    return null;
  else {
    let startDateValue = startDate.value;
    let endDateValue = endDate.value;
    if (startDateValue == null || endDateValue == null)
      return null;
    var formattedStartDate = new Date(startDateValue["month"] + "/" + startDateValue["day"] + "/" + startDateValue["year"]);
    var formattedEndDate = new Date(endDateValue["month"] + "/" + endDateValue["day"] + "/" + endDateValue["year"]);

    return formattedStartDate > formattedEndDate ? { 'badDates': true } : null;
  }
};