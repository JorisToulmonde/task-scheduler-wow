import { Component, Input, OnInit } from '@angular/core';
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
export class TaskListComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  tasksList: Task[] = [];

  newTask: string = '';

  trashIcon = faTrash;

  progressBarWidth: number = 0;

  ngOnInit(): void {
    this.calculateProgressBar();
  }

  addNewTask() {
    if(this.newTask.length > 0) {
      this.tasksList.push({
        name: this.newTask,
        checked: false
      } as Task);
      this.sortTaskList();
      this.calculateProgressBar();
      localStorage.setItem(this.title.toLowerCase(), JSON.stringify(this.tasksList));
      this.newTask = '';
    }
  }

  handleCheck() {
    this.calculateProgressBar();
    localStorage.setItem(this.title.toLowerCase(), JSON.stringify(this.tasksList));
  }

  deleteTask(index: number) {
    this.tasksList.splice(index, 1);
    localStorage.setItem(this.title.toLowerCase(), JSON.stringify(this.tasksList));
  }

  sortTaskList() {
    this.tasksList.sort((a, b) => a.name.localeCompare(b.name));
  }

  calculateProgressBar() {
    this.progressBarWidth = Math.round(this.tasksList.filter(task => task.checked).length / this.tasksList.length * 100);
  }

}
