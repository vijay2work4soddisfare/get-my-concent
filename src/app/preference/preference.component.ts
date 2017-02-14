import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Crisis }         from './crisis.service';
import { Observable } from 'rxjs';
import { AuthResolveService } from '../auth-resolve.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css'],
  providers:  [QuestionService,AuthResolveService]
})
export class PreferenceComponent implements OnInit {
 questions: any[];
crisis: Crisis;
  editName: string;
dialogRef: MdDialogRef<DialogResultExampleDialog>;
  constructor(public service: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog:MdDialog,
    private authService:AuthResolveService) {
    this.questions = service.getQuestions();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
        //console.log(this.crisis.id);
      });
  }
  canDeactivate():Observable<boolean> | boolean {
    
        //console.log("in candeactivate => ",this.crisis);
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides


    return this.openDialog();
    
  }
  logout(){
    this.authService.logout();
  }

  onSelect() {
    this.router.navigate(['../','partner'], { relativeTo: this.route });
  }
	openDialog():Observable<boolean> | boolean{
	    let dialogRef = this.dialog.open(DialogResultExampleDialog);
	    return dialogRef.afterClosed().first();
	}
}
//dialog component
@Component({
  selector: 'dialog-result-example-dialog',
  template: `<p>This is a dialog</p>
    <p>
      Sure want to discard??
    </p>
    <p> <button md-button (click)="dialogRef.close(true)">Yes</button>
     <button md-button (click)="dialogRef.close(false)">No</button> </p>`
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
