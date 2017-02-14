import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../services/task-service';
import {MdDialog, MdDialogRef} from '@angular/material';
import { TaskFormComponent } from './task-form';


@Component({
  template: `
    <div class="g-row">
      <div class="g-col">
        <button md-raised-button (click)="opendialog()">Add Partners</button>
        <!--task-form (createTask)="taskService.createTask($event)"></task-form-->
      </div>

      <div class="g-col">
        <task-list
          [filter]="filter | async"
          [tasks]="taskService.visibleTasks$"
          (remove)="taskService.removeTask($event)"
          (update)="taskService.updateTask($event.task, $event.changes)"></task-list>
      </div>
    </div>

  `
})

export class TasksComponent {
  filter: Observable<any>;

  dialogRef: MdDialogRef<TaskFormComponent>;
  constructor(public route: ActivatedRoute, public taskService: TaskService,public dialog:MdDialog) {
    this.filter = route.params
      .pluck('status')
      .do((value: string) => taskService.filterTasks(value));
  }
  opendialog(){
    let dialogRef = this.dialog.open(TaskFormComponent, {
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result=>{
        //console.log(result);
        if(result!=undefined && result!=null) {
          this.taskService.createTask(result.title,result.mobile)
        }
      });

  }
}
