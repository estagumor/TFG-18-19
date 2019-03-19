import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appLeadersRestriction]', //To use it in the HTML
  providers: [{ provide: NG_VALIDATORS, useExisting: LeadersRestrictionDirective, multi: true }]
})
export class LeadersRestrictionDirective implements Validator { //Make accesible

  validate(control: AbstractControl): ValidationErrors {
    return leaderValidator(control)
  }

  constructor() {
  }
}

export const leaderValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  // console.log(control);
  const researchers = control.get('finalResearchers');
  const leaders = control.get('finalLeaders');

  if (researchers == null || leaders == null)
    return null;
  else {
    let researchersValue = researchers.value;
    let leadersValue = leaders.value;
    if (researchersValue == null || leadersValue == null)
      return null;
    const found = researchersValue.some(r => leadersValue.indexOf(r) >= 0);
    return !found ? { 'badLeader': true } : null;
  }
};