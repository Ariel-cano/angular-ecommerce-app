import {AbstractControl, ValidationErrors} from '@angular/forms';

const CSS_COLOR_NAMES = [
  "aliceblue","antiquewhite","aqua","aquamarine","azure",
  "beige","bisque","black","blanchedalmond","blue","blueviolet",
  "brown","burlywood","cadetblue","chartreuse","chocolate","coral",
  "cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan",
  "darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta",
  "darkolivegreen","darkorange","darkorchid","darkred","darksalmon",
  "darkseagreen","darkslateblue","darkslategray","darkturquoise",
  "darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick",
  "floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold",
  "goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred",
  "indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon",
  "lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgreen","lightgrey",
  "lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue",
  "lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue",
  "mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen",
  "mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin",
  "navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod",
  "palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue",
  "purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen",
  "seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan",
  "teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"
];

export class CustomValidators {
  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return { required: true };

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLengthValid = value.length >= 8;

    const errors: any = {};
    if (!hasNumber) errors.noNumber = true;
    if (!hasUpper) errors.noUpperCase = true;
    if (!hasLower) errors.noLowerCase = true;
    if (!hasSpecial) errors.noSpecialChar = true;
    if (!isLengthValid) errors.minLength = true;

    return Object.keys(errors).length ? errors : null;
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }
  static urlValidator(control: AbstractControl): ValidationErrors | null {
    const strictUrlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return strictUrlRegex.test(control.value) ? null : { invalidUrl: true };
  }
  static colorValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').toLowerCase().trim();
    if (!value) return null;
    if (CSS_COLOR_NAMES.includes(value)) {
      return null;
    }
    return { invalidColor: true };
  }
  static nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return { required: true };

    const hasValidLength = value.length >= 3 && value.length <= 30;
    const hasOnlyLetters = /^[a-zA-Z\s]+$/.test(value);

    const errors: any = {};
    if (!hasValidLength) errors.invalidLength = true;
    if (!hasOnlyLetters) errors.invalidCharacters = true;

    return Object.keys(errors).length ? errors : null;
  }
}
