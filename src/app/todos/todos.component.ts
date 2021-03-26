import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import {
  faAngleDown,
  faAngleUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { DebugService } from '../debug/debug.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  user: User = {} as User;
  activeFilter = 'all';
  userIcon = faUser;
  angleDownIcon = faAngleDown;
  angleUpIcon = faAngleUp;

  constructor(
    private todoService: TodosService,
    private emailService: UserService,
    private debuggerService: DebugService
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.getUserName();
  }

  toggleDebugger(): void {
    this.debuggerService.toggleVisible();
  }

  get isDebuggerVisible(): boolean {
    return this.debuggerService.visible;
  }

  get isLoading(): boolean {
    return this.todoService.isLoading;
  }

  getUserName(): void {
    this.emailService.getUserById(1).subscribe((user) => (this.user = user));
  }

  getTodos(): void {
    this.todoService.fetchTodos().subscribe((todos) => (this.todos = todos));
  }

  get itemLeft(): number | void {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  filterBy(condition: string): void {
    this.activeFilter = condition;
    this.todoService
      .filterTodosBy(condition)
      .subscribe((result) => (this.todos = result));
  }

  setCurrentClasses(condition: string): any {
    return [
      this.activeFilter === condition ? 'btn-outline-info' : 'btn-link',
      'btn',
      'btn-sm',
    ];
  }

  add(title: string): void {
    if (!title.trim()) {
      return;
    }
    this.todoService
      .addTodo(new Todo(NaN, title, false))
      .subscribe((todo: Todo) => {
        this.getTodos();
      });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe((_) => {
      this.getTodos();
    });
  }

  removeTodo(todo: Todo): void {
    this.todoService.removeTodo(todo).subscribe((_) => {
      this.getTodos();
    });
  }
}
