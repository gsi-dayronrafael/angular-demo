import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todos/Todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { [key: string]: Todo[] } {
    const todos = [
      { id: 1, title: 'Study Angular', completed: false },
      { id: 2, title: 'Develop an amazing app', completed: false },
      { id: 3, title: 'Master RxJS', completed: false },
    ];
    return { todos };
  }
  genId(todos: Todo[]): number {
    return todos.length > 0
      ? Math.max(...todos.map((todo) => todo.id)) + 1
      : 11;
  }
}
