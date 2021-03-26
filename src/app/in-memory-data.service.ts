import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todos/todo.model';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { todos: Todo[]; users: User[] } {
    const todos = [
      { id: 1, title: 'Study Angular', completed: false },
      { id: 2, title: 'Develop an Amazing App', completed: false },
      { id: 3, title: 'Master RxJS', completed: false },
    ];

    const users = [
      {
        id: 1,
        firstName: 'Dayron R.',
        lastName: 'Torres',
        email: 'dayron.rafael@generalsoftwareinc.com',
        occupation: 'Front-End dev',
        phone: '53850858',
        address: {
          street: '206#27717',
          city: 'Boyeros',
          state: 'Havana',
        },
        aliases: ['toki', 'neco'],
      },
      {
        id: 2,
        firstName: 'Dayron R.',
        lastName: 'Torres',
        email: 'dtorresreyes25@gmail.com',
        occupation: 'Front-End dev',
        phone: '53850858',
        address: {
          street: '206#27717',
          city: 'Boyeros',
          state: 'Havana',
        },
        aliases: ['dayrito'],
      },
    ];

    return { todos, users };
  }
  genId(todos: Todo[]): number {
    return todos.length > 0
      ? Math.max(...todos.map((todo) => todo.id || 1)) + 1
      : 11;
  }
}
