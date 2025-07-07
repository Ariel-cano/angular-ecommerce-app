import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from '../validators/custom-validators';

@Directive({
  selector: '[appPasswordValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordValidationDirective),
      multi: true
    }
  ]
})
export class PasswordValidationDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.passwordValidator(control);
  }
}
