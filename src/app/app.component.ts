import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { Task } from './task-list/model/tache';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'task-scheduler-wow';

  dailies: Task[] = [];
  weeklies: Task[] = [];

  ngOnInit(): void {
    this.dailies = JSON.parse(localStorage.getItem('dailies') || '[]') as Task[];
    this.weeklies = JSON.parse(localStorage.getItem('weeklies') || '[]') as Task[];

    const lastConnectionDate = localStorage.getItem('lastConnectionDate');

    if(!!lastConnectionDate) {
      this.checkResetDailyDate(lastConnectionDate);
      this.checkResetWeeklyDate(lastConnectionDate);
    }

    localStorage.setItem('lastConnectionDate', JSON.stringify(new Date()));
  }
  
  checkResetDailyDate(lastConnectionDate: string) {
    const lastDate = new Date(JSON.parse(lastConnectionDate));
    const nextDateReset = new Date(lastDate);

    if(lastDate.getHours() >= 3) {
      nextDateReset.setDate(nextDateReset.getDate() + 1);
    } 
    
    nextDateReset.setHours(3);
    nextDateReset.setMinutes(0);
    
    if(lastDate.valueOf() <= nextDateReset.valueOf() && nextDateReset.valueOf() <= new Date().valueOf()) {
      this.resetTaskList(this.dailies, 'dailies');
    }
  }

  checkResetWeeklyDate(lastConnectionDate: string) {
    const lastDate = new Date(JSON.parse(lastConnectionDate));
    const nextDateReset = new Date(lastDate);

    if(lastDate.getDay() !== 3 || lastDate.getHours() >= 3) {
      nextDateReset.setDate(nextDateReset.getDate() + (((10 - nextDateReset.getDay()) % 7) || 7));
    } 

    nextDateReset.setHours(3);
    nextDateReset.setMinutes(0);

    if(lastDate.valueOf() <= nextDateReset.valueOf() && nextDateReset.valueOf() <= new Date().valueOf()) {
      this.resetTaskList(this.weeklies, 'weeklies');
    }
  }

  resetTaskList(taskList: Task[], keyLocalStorage: string) {
    taskList.forEach(task => task.checked = false);
    localStorage.setItem(keyLocalStorage, JSON.stringify(taskList));
  }
}
