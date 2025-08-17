import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from '../validators/custom-validators';

@Directive({
  selector: '[appColorValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ColorValidationDirective),
      multi: true
    }
  ]
})
export class ColorValidationDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.colorValidator(control);
  }
}
