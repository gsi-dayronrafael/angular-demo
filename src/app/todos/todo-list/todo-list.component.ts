import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { EmailService } from '../../user/email/email.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less'],
})
export class TodoListComponent implements OnInit {
  todos?: Todo[];
  origTodos = new Observable<Todo[]>((subscriber) => {
    this.todoService.getTodos().subscribe((todos) => subscriber.next(todos));
  });
  email?: string;

  constructor(
    private todoService: TodoService,
    private emailService: EmailService
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

  filterBy(condition?: string): void {
    if (!this.todos) {
      return;
    }
    let filterCallback: {
      (todo: Todo): boolean;
    };
    switch (condition) {
      case 'active':
        filterCallback = (todo: Todo) => !todo.completed;
        break;
      case 'completed':
        filterCallback = (todo: Todo) => todo.completed;
        break;
      default:
        filterCallback = (todo: Todo) => !!todo.id;
        break;
    }
    this.origTodos.subscribe(
      (todos: Todo[]) => (this.todos = todos.filter(filterCallback))
    );
  }

  remove(id: number): void {
    if (!this.todos) {
      return;
    }
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
