import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  user: User = {} as User;
  userWasUpdate = false;
  currentUserId = 1;

  constructor(
    private location: Location,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const routerState = this.router.getCurrentNavigation()?.extras;
    // if (routerState?.state?.wasUpdated) {
    //   this.isUserUpdated = true;
    //   setTimeout(() => (this.isUserUpdated = false), 1000);
    // }
    this.userWasUpdate = this.userService.isUserUpdated;
    this.fetchUserById(this.currentUserId);
  }

  fetchUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
