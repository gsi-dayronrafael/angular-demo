import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'user',
    component: UserDetailsComponent,
  },
  {
    path: 'user/:id',
    component: UserEditComponent,
  },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
