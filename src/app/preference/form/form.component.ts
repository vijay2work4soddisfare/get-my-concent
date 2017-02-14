import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

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

   @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService,private dataService : DataResolveService) {  }

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
