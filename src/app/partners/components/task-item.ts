import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../models/task';
import { ShowDialog } from './showDialog.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import { TaskService } from '../services/task-service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'task-item',
  styleUrls: ['./task-item.css'] ,
  templateUrl:'./task-item.html'
})

export class TaskItemComponent {
  constructor(public dialog:MdDialog,private taskService:TaskService){}
  @Input() task;
  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);
  @Output() move = new EventEmitter(false);

  dialogRef: MdDialogRef<ShowDialog>;
  editing: boolean = false;
  title: string = '';
  openDialog(task){
    this.taskService.setUser(task);
    let dialogRef = this.dialog.open(ShowDialog, {
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result=>{
        //console.log(result);
        switch (result) {
          case "request":
            this.sendRequest();
            this.moveTab(1);
            break;
          
          case "cancel":
            this.cancelRequest();
            this.moveTab(0);
            break;
          
          case "unblock":
            this.unBlockPartner();
            this.moveTab(0);
            break;
          
          case "block":
            this.blockPartner();
            this.moveTab(2);
            break;
          
          case "remove":
//            console.log("deleting");
            this.remove.emit();
            this.moveTab(0);
            break;
          
          default:
            // code...
            break;
        }
        this.taskService.unSetUser();
      });
  }
  editTitle(): void {
    this.editing = true;
    this.title = this.task.title;
  }


  saveTitle(): void {
    if (this.editing) {
      const title: string = this.title.trim();
      if (title.length && title !== this.task.title) {
        this.update.emit({title});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.update.emit({
      status: !this.task.status
    });
  }
  cancelRequest(): void {
    this.update.emit({
      status: 'partner'
    });
  }
  unBlockPartner(): void {
    this.update.emit({
      status: 'partner'
    });
  }
  sendRequest(): void {
    this.update.emit({
      status: 'request'
    });
  }
  blockPartner(): void {
    this.update.emit({
      status: 'blocked'
    });
  }
  moveTab(tabIndex){
    this.move.emit({'index':tabIndex});
  }
}
