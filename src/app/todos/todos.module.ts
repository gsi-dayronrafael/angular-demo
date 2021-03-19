import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { DebugModule } from '../debug/debug.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [TodoListComponent, TodoComponent],
  exports: [TodoListComponent],
  imports: [CommonModule, FormsModule, DebugModule, AppRoutingModule],
})
export class TodosModule {}
