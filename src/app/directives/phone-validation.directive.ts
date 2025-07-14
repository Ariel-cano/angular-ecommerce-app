import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from '../validators/custom-validators';

@Directive({
  selector: '[appPhoneValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneValidationDirective),
      multi: true
    }
  ]
})
export class PhoneValidationDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.phoneValidator(control);
  }

}
