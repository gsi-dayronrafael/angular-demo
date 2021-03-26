import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { DebugModule } from '../debug/debug.module';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TodosComponent, TodoComponent],
  exports: [TodosComponent],
  imports: [
    CommonModule,
    FormsModule,
    DebugModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
})
export class TodosModule {}
