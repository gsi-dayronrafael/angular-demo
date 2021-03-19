import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmailService } from './email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.less'],
})
export class EmailComponent implements OnInit {
  email?: string;
  isEditing = false;

  constructor(private location: Location, private emailService: EmailService) {}

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail(): void {
    this.emailService.getEmail().subscribe((email) => {
      this.email = email;
    });
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  add(email: string): void {
    this.emailService
      .addEmail(email)
      .subscribe((newEmail) => (this.email = newEmail));
  }

  update(newEmail: string): void {
    if (!newEmail.trim()) {
      return;
    }
    this.emailService
      .updateEmail(newEmail)
      .subscribe((updateEmail) => (this.email = updateEmail));
    this.toggleEditing();
  }

  delete(): void {
    this.email = '';
    this.emailService.deleteEmail();
  }

  goBack(): void {
    this.location.back();
  }
}
