import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ShowMapComponent } from '../show-map/show-map.component';
import { Router,ActivatedRoute } from '@angular/router';
import { QuestionBase }              from '../base';
import { QuestionControlService }    from '../control.service';
import { DataResolveService }    from '../../data-resolve.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ QuestionControlService ]
})
export class FormComponent implements OnInit {
  dialogRef: MdDialogRef<ShowMapComponent>;
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  user;
  constructor(public dialog: MdDialog,private qcs: QuestionControlService,private dataService : DataResolveService) { 
      this.user=dataService.getUserData()
   }
  openDialog() {
    this.dialogRef = this.dialog.open(ShowMapComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      //console.log('result: ' + result);
      this.dialogRef = null;
    });
  }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    //this.payLoad = JSON.stringify(this.form.value);
    //console.log(this.form);
    this.dataService.updateProfile(this.form.value);
    //this.router.navigate(['../','Partners'],{relativeTo:this.r});
  }

}
