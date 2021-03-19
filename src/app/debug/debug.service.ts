import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DebugService {
  constructor() {}

  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }
  clear(): void {
    this.messages.length = 0;
  }
}
