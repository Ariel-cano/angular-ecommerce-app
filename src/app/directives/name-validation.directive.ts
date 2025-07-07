import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from '../validators/custom-validators';

@Directive({
  selector: '[appNameValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NameValidationDirective),
      multi: true
    }
  ]
})
export class NameValidationDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.nameValidator(control);
  }
}
