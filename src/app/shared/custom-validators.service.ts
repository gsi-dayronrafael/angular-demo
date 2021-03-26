import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../user/user.service';
import { catchError, map, tap } from 'rxjs/operators';
import { DebugService } from '../debug/debug.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(
    private userService: UserService,
    private debugService: DebugService
  ) {}

  log(message: string): void {
    this.debugService.add(`CustomValidator: ${message}`);
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control): ValidationErrors | null => {
      const isForbidden = nameRe.test(control.value);
      this.log('Validating Forbidden Name');
      return isForbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  uniqueEmailValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.checkUniqueEmail(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueEmail: true } : null)),
      tap((_) => this.log(`Validating email is unique`)),
      catchError(() => of(null))
    );
  }
}
