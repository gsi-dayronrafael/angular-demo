import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo.model';
import { DebugService } from '../debug/debug.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient, private messageService: DebugService) {}
  isLoading = false;
  private todosUrl = `/api/todos`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  todoEditingId = -1;

  setEditingTodoId(id: number): void {
    this.todoEditingId = id;
  }

  private log(message: string): void {
    this.messageService.add(`TodoService: ${message}`);
  }

  private onFinish = () => (this.isLoading = false);

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

  fetchTodos(): Observable<Todo[]> {
    this.isLoading = true;
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap((todos) => {
        this.log('Fetched todos');
      }),
      catchError(this.handleError<Todo[]>('GetTodos', [])),
      finalize(this.onFinish)
    );
  }

  filterTodosBy(condition: string): Observable<Todo[]> {
    let filterCallback = (todo: Todo) => !!todo.id;
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
    return this.fetchTodos().pipe(
      map((todos) => todos.filter(filterCallback)),
      tap((_) => this.log(`Filter by= ${condition}`))
    );
  }

  removeTodo(todoId: number | Todo): Observable<any> {
    this.isLoading = true;
    const id = typeof todoId === 'number' ? todoId : todoId.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => {
        this.log(`Removed todo w/ id= ${id}`);
      }),
      catchError(this.handleError<any>('RemoveTodo')),
      finalize(this.onFinish)
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    this.isLoading = true;
    return this.http.post<Todo>(this.todosUrl, todo).pipe(
      tap((newTodo) => {
        this.log(`Added new TODO w/ title = ${todo.title}`);
      }),
      catchError(this.handleError<Todo>('AddTodo')),
      finalize(this.onFinish)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    this.isLoading = true;
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, this.httpOptions).pipe(
      tap((_) => {
        this.log(`Update Todo w/ id= ${todo.id}`);
      }),
      catchError(this.handleError<Todo>('UpdateTodo')),
      finalize(this.onFinish)
    );
  }
}
