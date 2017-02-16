import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { ITask } from '../models/task';
import { TaskService } from '../services/task-service';


@Component({
  selector: 'dialog-result-example-dialog',
  template: `<p>{{user.title}}</p>
    <p>mobile : {{user.mobile}}</p>
    <p>pic :{{user.pic}}</p>
    <p>
    <button md-raised-button *ngIf="user.status=='partner' && gender=='Male'"
      (click)="dialogRef.close('request')"
      aria-label="Delete task"
      class="task-item__button"
      type="button">
      <md-icon>mail</md-icon> Request
    </button>
    <button md-raised-button *ngIf="user.status=='request'"
      (click)="dialogRef.close('cancel')"
      aria-label="Delete task"
      class="task-item__button"
      type="button">
      <md-icon>mail</md-icon> Cancel
    </button>
    <button md-raised-button *ngIf="user.status!='blocked'"
      (click)="dialogRef.close('block')"
      aria-label="Delete task"
      class="task-item__button"
      type="button">
      <md-icon>block</md-icon> Block
    </button>
    <button md-raised-button *ngIf="user.status=='blocked'"
      (click)="dialogRef.close('unblock')"
      aria-label="Delete task"
      class="task-item__button"
      type="button">
      <md-icon>block</md-icon> Unlock
    </button>
    <button md-raised-button
      (click)="dialogRef.close('remove')"
      aria-label="Delete task"
      class="task-item__button"
      type="button">
      <md-icon>delete</md-icon> Delete
    </button>
     </p>
     `
})
export class ShowDialog implements OnInit {
  user:ITask;
  gender;
  constructor(public dialogRef: MdDialogRef<ShowDialog>,private taskService:TaskService) {
    this.gender=taskService.getCurrentUser().gender;
    this.user=taskService.getUser();
  }

  ngOnInit() {
//    console.log("selected user : ",this.user);
  }
}
