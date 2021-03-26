import { Component, OnInit } from '@angular/core';
import { DebugService } from './debug.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.less'],
})
export class DebugComponent implements OnInit {
  messages: string[] = [];
  constructor(private debugService: DebugService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.messages = this.debugService.messages;
  }

  clear(): void {
    this.debugService.clear();
  }

  get isVisible(): boolean {
    return this.debugService.visible;
  }
}
