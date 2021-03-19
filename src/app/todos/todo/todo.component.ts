import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent implements OnInit {
  @Input() todo?: Todo;
  @Output() todoRemove: EventEmitter<number> = new EventEmitter();
  @Output() todoEdit: EventEmitter<Todo> = new EventEmitter();

  isEditing = false;

  constructor() {}

  ngOnInit(): void {}

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  sendTodoChanges(): void {
    this.todoEdit.emit(this.todo);
    if (this.isEditing) {
      this.toggleEditing();
    }
  }

  toggleStatus(): void {
    if (!this.todo) {
      return;
    }
    this.todo.completed = !this.todo?.completed;
    this.sendTodoChanges();
  }

  setNewTitle(newTitle: string): void {
    if (!this.todo) {
      return;
    }
    this.todo.title = newTitle;
    this.sendTodoChanges();
  }

  remove(todo: Todo): void {
    this.todoRemove.emit(todo.id);
  }
}
