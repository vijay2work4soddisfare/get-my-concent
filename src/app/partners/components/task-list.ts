import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { ITask } from '../models/task';
import { Router,ActivatedRoute } from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'task-list',
  styleUrls: ['./task-list.css'],
  template: `
    <md-tab-group (selectChange)="displayall($event)" [selectedIndex]="tabIndex">
      <md-tab>
        <template md-tab-label>
          Partners
        </template>
          <div class="task-list">
            <task-item
              *ngFor="let task of tasks | async"
              [task]="task"
              (move)="displayall($event)"
              (remove)="remove.emit(task)"
              (update)="update.emit({task: task, changes: $event})"></task-item>
          </div>
      </md-tab>
      <md-tab>
        <template md-tab-label>
          Requests
        </template>
          <div class="task-list">
            <task-item
              *ngFor="let task of tasks | async"
              [task]="task"
              (remove)="remove.emit(task)"
              (move)="displayall($event)"
              (update)="update.emit({task: task, changes: $event})"></task-item>
          </div>
      </md-tab>
      <md-tab>
        <template md-tab-label>
          Blocked
        </template>
          <div class="task-list">
            <task-item
              *ngFor="let task of tasks | async"
              [task]="task"
              (move)="displayall($event)"
              (remove)="remove.emit(task)"
              (update)="update.emit({task: task, changes: $event})"></task-item>
          </div>
      </md-tab>
    </md-tab-group>
  `
})

export class TaskListComponent implements OnInit{
  @Input() filter: string;
  @Input() tasks: FirebaseListObservable<ITask[]>;
  tabIndex=0;
  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);
  constructor(private router:Router,private r:ActivatedRoute,public snackBar: MdSnackBar){

  }
  ngOnInit(){
    this.selectTabb();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  selectTabb(){
    switch (this.filter) {
      case 'blocked':
        this.tabIndex=2;
        break;
      
      case 'request':
        this.tabIndex=1;
        break;      
    }
    //console.log(this.tabIndex);
  }
  displayall($event){
    var tabName;
    switch ($event.index) {
      case 0:
        tabName="Partners";
        this.router.navigate(['../','Partners',{}],{relativeTo:this.r});
        break;

      case 1:
        tabName="Request";
        this.router.navigate(['../','Partners',{status: 'request'}],{relativeTo:this.r});
        break;

      case 2:
        tabName="Blocked";
        this.router.navigate(['../','Partners',{status: 'blocked'}],{relativeTo:this.r});
        break;
      
      default:
        tabName="Partners";
        this.router.navigate(['../','Partners'],{relativeTo:this.r});
        break;
    }
    this.openSnackBar("You are viewing "+tabName, "OK");
    this.tabIndex=$event.index;
  }
}
