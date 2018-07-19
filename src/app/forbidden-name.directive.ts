import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} =>{
		const forbidden =  nameRe.test(control.value);
		return forbidden? {'forbiddenName': {value: control.value}} : null;
	};
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [{
  	provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true
  }]
})
export class ForbiddenNameDirective {
  @Input('appForbiddenName') forbiddenName: string;
  constructor() { }

  validate(control: AbstractControl): {[key:string]: any} {
     return this.forbiddenName? forbiddenNameValidator(new RegExp(this.forbiddenName, "i"))(control): null;
  }

}
