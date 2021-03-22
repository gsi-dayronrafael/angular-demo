import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserDetailsComponent, UserEditComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class UserModule {}
