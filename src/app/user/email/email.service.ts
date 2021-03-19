import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DebugService } from '../../debug/debug.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  email = 'dayron.rafael@generalsoftwareinc.com';
  constructor(private debug: DebugService) {}

  log(message: string): void {
    this.debug.add(`EmailService: ${message}`);
  }

  addEmail(email: string): Observable<string> {
    this.email = email;
    return of(this.email).pipe(tap((_) => this.log(`Added new email`)));
  }

  getEmail(): Observable<string> {
    return of(this.email).pipe(tap((_) => this.log('Fetched email')));
  }

  updateEmail(email: string): Observable<string> {
    this.email = email;
    return of(this.email).pipe(tap((_) => this.log(`Updated email`)));
  }

  deleteEmail(): void {
    this.email = '';
    this.log('Deleted email');
  }
}
