import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../user/user.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(private userService: UserService) {}

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control): ValidationErrors | null => {
      const isForbidden = nameRe.test(control.value);
      return isForbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  namesEqualsValidator(control: AbstractControl): ValidationErrors | null {
    const firstname = control.get('firstName');
    const lastname = control.get('lastName');
    return firstname && lastname && firstname?.value === lastname?.value
      ? { namesEquals: true }
      : null;
  }

  uniqueEmailValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.checkUniqueEmail(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueEmail: true } : null)),
      catchError(() => of(null))
    );
  }
}
