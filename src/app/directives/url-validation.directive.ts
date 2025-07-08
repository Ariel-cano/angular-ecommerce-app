import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from '../validators/custom-validators';

@Directive({
  selector: '[appUrlValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UrlValidationDirective),
      multi: true
    }
  ]
})
export class UrlValidationDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.urlValidator(control);
  }
}
