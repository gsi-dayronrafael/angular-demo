import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo = {} as Todo;
  @Output() remove = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {}

  onToggleStatus(): void {
    this.todo.completed = !this.todo?.completed;
    this.todoService.updateTodo(this.todo).subscribe();
  }

  toggleEditing(): void {
    this.todoService.setEditingTodoId(
      !this.isEditing ? this.todo.id || -1 : -1
    );
  }

  get isEditingSiblins(): boolean {
    return this.todoService.todoEditingId !== -1;
  }

  get isEditing(): boolean {
    return this.todoService.todoEditingId === this.todo.id;
  }

  onUpdate(newTitle: string): void {
    if (!newTitle.trim()) {
      return;
    }
    if (this.isEditing) {
      this.todoService.setEditingTodoId(-1);
    }
    this.todo.title = newTitle;
    this.update.emit(this.todo);
  }

  onRemove(): void {
    this.remove.emit(this.todo);
  }
}
