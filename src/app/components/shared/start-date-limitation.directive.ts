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
    console.log("s:" + startDate + " e:" + endDate);
    let startDateValue = startDate.value;
    let endDateValue = endDate.value;
    if (startDateValue == null || endDateValue == null)
      return null;
    var formattedStartDate = new Date(startDateValue["month"] + "/" + startDateValue["day"] + "/" + startDateValue["year"]);
    var formattedEndDate = new Date(endDateValue["month"] + "/" + endDateValue["day"] + "/" + endDateValue["year"]);
    console.log(control);
    console.log("s:" + startDateValue + " e:" + endDateValue);
    console.log("s:" + formattedStartDate + " e:" + formattedEndDate);

    return formattedStartDate > formattedEndDate ? { 'badDates': true } : null;
  }
};