import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './dropdown';
import { QuestionBase }     from './base';
import { TextboxQuestion }  from './textbox';
import { CheckboxQuestion }  from './checkbox';
import { DataResolveService } from '../data-resolve.service';
@Injectable()
export class QuestionService {
  data;
  constructor(private dataService:DataResolveService){
    this.data=this.dataService.getUserData();
  }
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: this.data.name,
        type: 'text',
        required: true,
        order: 1
      }),

      new DropdownQuestion({
        key: 'gender',
        label: 'Gender',
        options: [
          {key: 'male',  value: 'Male'},
          {key: 'female',  value: 'Female'}
        ],
        value:this.data.gender,
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'mobile',
        label: 'Mobile',
        type: 'tel',
        value:this.data.mobile,
        required: true,
        minlength: 10,
        maxlength: 10,
        patern: /[0-9]/,
        count:10,
        order: 3
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        value:this.data.email,
        type: 'text',
        required: true,
        readonly: true,
        patern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        order: 4
      }),

      new TextboxQuestion({
        key: 'sleep',
        label: 'Sleeping Time',
        value:this.data.sleepingTime,
        type: 'time',
        required: true,
        order: 5
      }),

      new CheckboxQuestion({
        key:'condition1',
        label:'All conditions accepted',
        type:'checkbox',
        required: true,
        order:6
      }),

      new CheckboxQuestion({
        key:'condition2',
        label:'All conditions accepted',
        type:'checkbox',
        required: true,
        order:6
      }),

      new CheckboxQuestion({
        key:'condition3',
        label:'All conditions accepted',
        type:'checkbox',
        required: true,
        order:6
      })
    ];
    console.log(questions);
    return questions.sort((a, b) => a.order - b.order);
  }
}