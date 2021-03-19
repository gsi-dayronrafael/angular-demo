import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { EmailComponent } from './user/email/email.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'user',
    component: EmailComponent,
  },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
