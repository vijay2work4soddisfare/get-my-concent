import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../services/task-service';
import {MdDialog, MdDialogRef} from '@angular/material';
import { TaskFormComponent } from './task-form';
import { AuthResolveService } from '../../auth-resolve.service';

@Component({
  template: `
    <md-sidenav-container fullscreen>
      <md-toolbar color="primary">
        <span>Get My Consent</span>
        <span class="emptySpace"></span>
        <span>
          <button md-raised-button color="accent" (click)="logout()" >Logout</button>
        </span>
      </md-toolbar>
        <div class="g-row">
          <div class="g-col">
            <task-list
              [filter]="filter | async"
              [tasks]="taskService.visibleTasks$"
              (remove)="taskService.removeTask($event)"
              (update)="taskService.updateTask($event.task, $event.changes)"></task-list>
          </div>
          <div class="g-col">
            <button md-raised-button (click)="opendialog()">Add Partners</button>
          </div>
        </div>
    </md-sidenav-container>

  `,
  styles:[`.emptySpace{
     flex:1 1 auto;
    }`]
})

export class TasksComponent {
  filter: Observable<any>;

  dialogRef: MdDialogRef<TaskFormComponent>;
  constructor(private  auth:AuthResolveService,public route: ActivatedRoute, public taskService: TaskService,public dialog:MdDialog) {
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
  logout(){
    this.auth.logout();
  }
}
