import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../services/task-service';
import {MdDialog, MdDialogRef} from '@angular/material';
import { TaskFormComponent } from './task-form';
import { PartnersComponent } from '../partners.component';
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
          <md-card-subtitle align="center" *ngIf="!reportedR">
            I want to report marital rape... 
            <button md-raised-button class="notReported" (click)="taskService.reportMR();reportedR=!reportedR;">Report it !</button>
          </md-card-subtitle>
            <button *ngIf="reportedR" md-raised-button class="reported" (click)="showReports()">Reported marital rape</button>
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
    }
    .reported{
      background-color:red;color:white;margin:2%;
    }
    .notReported{
      background-color:green;color:white;margin:2%;
    }`]
})

export class TasksComponent {
  filter: Observable<any>;
  reportedR=false;
  dialogRef: MdDialogRef<TaskFormComponent>;
  dialogRefS: MdDialogRef<PartnersComponent>;
  constructor(private  auth:AuthResolveService,public route: ActivatedRoute, public router: Router, public taskService: TaskService,public dialog:MdDialog) {
    this.filter = route.params
      .pluck('status')
      .do((value: string) => taskService.filterTasks(value));
    this.reportedR=this.taskService.getReportStatus();
  }
  opendialog(){
    let dialogRef = this.dialog.open(TaskFormComponent, {
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result=>{
        //console.log(result);
        if(result!=undefined && result!=null) {
          if(result!='map') {
            this.taskService.createTask(result.title,result.mobile)
          }else{
            //console.log("open the map here");
            this.openMap();
          }
        }
      });

  }
  showReports(){
    let dialogRefS = this.dialog.open(PartnersComponent, {
        disableClose: false
      });
      dialogRefS.afterClosed().subscribe(result=>{
        //console.log(result);
      });
  }
  openMap() {
    this.router.navigate(['../','Preference'],{relativeTo:this.route});
  }
  logout(){
    this.auth.logout();
  }
}
