import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoFormComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['todos.component.css']
})
export class TodosComponent {
  todos: ITodo[] = [];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() 
  {

    if (localStorage.getItem('token') == null)
      this.router.navigate(['/login']);
    else
      this.loadTodos();
  }

  loadTodos() 
  {
    this.todoService.getTodos().subscribe({
      next: (todos) => this.todos = todos.data,
      error: (err) => console.error(err)
    });
  }

  addTodo(content: string) {
    this.todoService.createTodo(content).subscribe({
      next: (todo) => this.todos.push(todo.data),
      error: (err) => console.error(err)
    });
  }

  updateTodo(uuid: string) {
    const newContent = prompt('Edit todo:', this.todos.find(t => t.uuid === uuid)?.content);
    if (newContent) {
      this.todoService.updateTodo(uuid, newContent).subscribe({
        next: (updatedTodo) => {
          this.todos = this.todos.map(t => 
            t.uuid === uuid ? updatedTodo.data : t
          );
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteTodo(uuid: string) {
    if (confirm('Delete this todo?')) {
      this.todoService.deleteTodo(uuid).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.uuid !== uuid);
        },
        error: (err) => console.error(err)
      });
    }
  }
}


export interface ITodo {
  id?: number
  uuid: string
  content: string
  user_uuid: string
  createdAt?: Date
  updatedAt?: Date
}