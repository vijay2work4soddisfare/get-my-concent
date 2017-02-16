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
        key:'condition',
        label:'If the partner is unconsious or asleep then there is no consent to sex',
        type:'checkbox',
        required: true,
        gender:'Male',
        value:(this.data.condition)?true:'',
        checked:(this.data.condition)?true:false,
        order:6
      }),

      new CheckboxQuestion({
        key:'condition',
        label:'After consenting to sex and the partner falls asleep / unconsious due to medicine / alcohol then there is no consent to sex ',
        type:'checkbox',
        gender:'Male',
        value:(this.data.condition)?true:'',
        checked:(this.data.condition)?true:false,
        required: true,
        order:7
      }),

      new CheckboxQuestion({
        key:'condition',
        label:'After the session there is no more consent to sex',
        type:'checkbox',
        gender:'Male',
        value:(this.data.condition)?true:'',
        checked:(this.data.condition)?true:false,
        required: true,
        order:8
      }),

      new CheckboxQuestion({
        key:'condition',
        label:'After the consenting to sex the partner can revoke the consent to sex',
        type:'checkbox',
        gender:'Male',
        value:(this.data.condition)?true:'',
        checked:(this.data.condition)?true:false,
        required: true,
        order:9
      }),

      new CheckboxQuestion({
        key:'condition',
        label:'Sex without consent with your partner is considerd crime in first world contries. You will be labelled sexual offender for rest of your life.',
        type:'checkbox',
        gender:'Male',
        value:(this.data.condition)?true:'',
        checked:(this.data.condition)?true:false,
        required: true,
        order:10
      }),

      new CheckboxQuestion({
        key:'condition',
        label:'UnNatural sex is criminal as per Section 377 of the Indian Penal Code, 1860 Unnatural Offences',
        type:'checkbox',
        gender:'Female',
        value:(this.data.condition)?true:'',
        required: true,
        checked:(this.data.condition)?true:false,
        order:11
      }),
      new CheckboxQuestion({
        key:'condition',
        label:'If You want to withdraw active consent before sleep and if the male is sleeping then you need to wake the partner before withdrawing consent.',
        type:'checkbox',
        gender:'Female',
        value:(this.data.condition)?true:'',
        checked:(this.data.condition)?true:false,
        required: true,
        order:12
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}