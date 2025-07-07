import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from '../validators/custom-validators';

@Directive({
  selector: '[appEmailValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidationDirective),
      multi: true
    }
  ]
})
export class EmailValidationDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.emailValidator(control);
  }
}
