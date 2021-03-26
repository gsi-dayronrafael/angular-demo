import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidatorsService } from '../../shared/custom-validators.service';
import { Location } from '@angular/common';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less'],
})
export class UserEditComponent implements OnInit {
  faCoffee = faCoffee;
  userProfile = this.fb.group({
    id: this.fb.control(''),
    firstName: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      this.customValidatorService.forbiddenNameValidator(/Ramon/i),
    ]),
    lastName: this.fb.control(''),
    email: this.fb.control('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email],
      asyncValidators: this.customValidatorService.uniqueEmailValidator.bind(
        this.customValidatorService
      ),
    }),
    occupation: this.fb.control(''),
    phone: this.fb.control(''),
    address: this.fb.group({
      street: this.fb.control(''),
      city: this.fb.control(''),
      state: this.fb.control(''),
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private customValidatorService: CustomValidatorsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(Number(userId)).subscribe((user) => {
      this.userProfile.patchValue(user);
    });
  }

  get userFirstName(): FormControl {
    return this.userProfile.get('firstName') as FormControl;
  }

  get aliases(): FormArray {
    return this.userProfile.get('aliases') as FormArray;
  }

  get userEmail(): FormControl {
    return this.userProfile.get('email') as FormControl;
  }

  setValidationClass(controlName: string | number): string {
    const isControlName = typeof controlName === 'string';
    let control = this.userProfile.get(
      isControlName ? (controlName as string) : 'aliases'
    );
    control = isControlName
      ? control
      : (control as FormArray)?.controls[controlName as number];
    if (control?.touched || control?.dirty) {
      return control.invalid
        ? 'is-invalid'
        : !control.value
        ? 'is-warning'
        : 'is-valid';
    }
    return '';
  }

  addAlias(): void {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit(): void {
    console.log(this.userProfile.value);
    this.userService.updateUser(this.userProfile.value).subscribe();
    this.router.navigate(['/user'], { state: { wasUpdated: true } });
  }

  goBack(): void {
    this.location.back();
  }
}
