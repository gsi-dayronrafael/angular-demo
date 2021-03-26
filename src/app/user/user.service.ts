import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DebugService } from '../debug/debug.service';
import { catchError, tap, map, timeout } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  email = 'emailToMatch@generalsoftwareinc.com';
  isUserUpdated = false;
  usersUrl = 'api/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private debug: DebugService, private http: HttpClient) {}

  log(message: string): void {
    this.debug.add(`userService: ${message}`);
  }

  handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error): Observable<T> => {
      console.error(error.message);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  checkUniqueEmail(email: string): Observable<boolean> {
    return this.fetchUsers().pipe(
      map((users) => users.some((user) => user.email === email))
    );
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap((_) => this.log('Fetched users')),
      catchError(this.handleError<User[]>('fetchUsers', []))
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions).pipe(
      tap((_) => {
        this.isUserUpdated = true;
        setTimeout(() => (this.isUserUpdated = false), 2000);
        this.log(`Updated user w/ id= ${user.id}`);
      }),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  getUserById(user: number | User): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((usr) => this.log(`Fetched user w/ id= ${usr.id}`)),
      catchError(this.handleError<User>('getUserById'))
    );
  }
}
