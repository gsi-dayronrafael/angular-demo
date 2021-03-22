import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less'],
})
export class UserDetailsComponent implements OnInit {
  user: User = {} as User;
  currentUserId = 1;

  constructor(private location: Location, private userService: UserService) {}

  ngOnInit(): void {
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
