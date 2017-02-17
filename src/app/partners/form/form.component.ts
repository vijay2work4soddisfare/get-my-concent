import { Component, Input, OnInit,Output,EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import { QuestionBase }              from '../base';
import { QuestionControlService }    from '../control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ QuestionControlService ]
})
export class FormComponent implements OnInit {
  @Output() close = new EventEmitter(false);
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService,private router:Router,private r:ActivatedRoute) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    //this.payLoad = JSON.stringify(this.form.value);
    //console.log(this.form.value);
    this.close.emit(this.form.value);
    //this.router.navigate(['../','Partners'],{relativeTo:this.r});
  }
  openMap(){
    this.close.emit('map');
  }

}
