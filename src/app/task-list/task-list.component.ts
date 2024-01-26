import { Component, Input } from '@angular/core';
import { Task } from './model/tache';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  @Input()
  title: string = '';

  @Input()
  tasksList: Task[] = [];

  newTask: string = '';

  trashIcon = faTrash;

  addNewTask() {
    if(this.newTask.length > 0) {
      this.tasksList.push({
        name: this.newTask,
        checked: false
      } as Task);
      localStorage.setItem(this.title.toLowerCase(), JSON.stringify(this.tasksList));
      this.newTask = '';
    }
  }

  handleCheck() {
    localStorage.setItem(this.title.toLowerCase(), JSON.stringify(this.tasksList));
  }

  deleteTask(index: number) {
    this.tasksList.splice(index, 1);
    localStorage.setItem(this.title.toLowerCase(), JSON.stringify(this.tasksList));
  }

}
