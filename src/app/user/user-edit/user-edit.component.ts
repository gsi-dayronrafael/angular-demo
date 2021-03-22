import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { CustomValidatorsService } from '../../shared/custom-validators.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less'],
})
export class UserEditComponent implements OnInit {
  userProfile = this.fb.group(
    {
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
    },
    this.customValidatorService.namesEqualsValidator
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
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

  addAlias(): void {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit(): void {
    console.log(this.userProfile.value);
    this.userService.updateUser(this.userProfile.value).subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
