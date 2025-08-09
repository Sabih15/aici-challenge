import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() todoAdded = new EventEmitter<string>();
  content = '';

  onSubmit() {
    if (this.content.trim()) {
      this.todoAdded.emit(this.content);
      this.content = '';
    }
  }
}