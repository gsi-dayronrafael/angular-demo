import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  email?: string;

  constructor(
    private todoService: TodoService,
    private emailService: UserService
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.getEmail();
  }

  getEmail(): void {
    this.email = this.emailService.email;
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  get itemLeft(): number | void {
    if (!this.todos) {
      return;
    }
    return this.todos.filter((todo) => !todo.completed).length;
  }

  filterBy(condition: 'all' | 'active' | 'completed'): void {
    this.todoService
      .filterTodosBy(condition)
      .subscribe((result) => (this.todos = result));
  }

  remove(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.todoService.removeTodo(id).subscribe();
  }

  add(title: string): void {
    if (!title.trim()) {
      return;
    }
    this.todoService.addTodo(title).subscribe((todo: Todo) => {
      if (this.todos) {
        this.todos.push(todo);
      }
    });
  }

  update(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }
}
