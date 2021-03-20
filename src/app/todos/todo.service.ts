import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './Todo';
import { DebugService } from '../debug/debug.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient, private messageService: DebugService) {}

  todosUrl = `/api/todos`;
  todos: Todo[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  log(message: string): void {
    this.messageService.add(`TodoService: ${message}`);
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error.message);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap((todos) => {
        this.todos = todos;
        this.log('Fetched todos');
      }),
      catchError(this.handleError<Todo[]>('GetTodos', []))
    );
  }

  filterTodosBy(condition: 'all' | 'active' | 'completed'): Observable<Todo[]> {
    let filterCallback: (todo: Todo) => boolean;
    switch (condition) {
      case 'active':
        filterCallback = (todo: Todo) => !todo.completed;
        break;
      case 'completed':
        filterCallback = (todo: Todo) => todo.completed;
        break;
      case 'all':
        filterCallback = (todo: Todo) => !!todo.id;
        break;
    }
    return of(this.todos.filter(filterCallback)).pipe(
      tap((_) => this.log(`Filter by= ${condition}`))
    );
  }

  removeTodo(todoId: number | Todo): Observable<any> {
    const id = typeof todoId === 'number' ? todoId : todoId.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => {
        this.getTodos().subscribe();
        this.log(`Removed todo w/ id= ${id}`);
      }),
      catchError(this.handleError<any>('RemoveTodo'))
    );
  }

  addTodo(title: string): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, { title, completed: false })
      .pipe(
        tap((todo) => {
          this.getTodos().subscribe();
          this.log(`Added new TODO w/ title = ${todo.title}`);
        }),
        catchError(this.handleError<Todo>('AddTodo'))
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, this.httpOptions).pipe(
      tap((_) => {
        this.getTodos().subscribe();
        this.log(`Update Todo w/ id= ${todo.id}`);
      }),
      catchError(this.handleError<Todo>('UpdateTodo'))
    );
  }
}
