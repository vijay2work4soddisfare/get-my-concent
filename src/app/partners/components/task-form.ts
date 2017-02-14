import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { QuestionService } from '../question.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'task-form',
  styleUrls:['task-form.css'],
  template: `
      <app-form [questions]="questions" (close)="submit($event)"></app-form>
      <!--md-input
        [(ngModel)]="title"
        value="{{title}}"
        (keyup.escape)="clearA()"
        autofocus
        placeholder="Partners Name"
        required
        type="text"></md-input>
      <md-input
        [(ngModel)]="mobile"
        value="{{mobile}}"
        (keyup.escape)="clearB()"
        autofocus
        placeholder="Partner's mobile"
        required
        type="tel"></md-input>
        <button md-raised-button type="submit" (click)="submit()" color="primary"><md-icon>add</md-icon> Add</button-->
  `,
  providers:[QuestionService]
})

export class TaskFormComponent {
  constructor(public service: QuestionService,public dialogRef: MdDialogRef<TaskFormComponent>){
    this.questions = service.getQuestions();
  }
  @Output() createTask = new EventEmitter(false);
  title: string = '';
  mobile: string = '';
  questions: any[];
  clearA(): void {
    this.title = '';
  }
  clearB(): void {
    this.mobile = '';
  }

  submit($event): void {
    const title: string = $event.name.trim();
    const mobile: string = $event.mobile.trim();
    this.clearA();
    this.clearB();
    if (title.length) {
      this.dialogRef.close({title,mobile});
      //console.log("From dialog : ",{title,mobile});
    }
  }
}
