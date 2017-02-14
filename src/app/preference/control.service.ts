import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};
    questions.forEach(question => {
    	var val=[];
    	if(question.required) {
    		val.push(Validators.required);
    	}
    	if(question.requiredTrue) {
    		val.push(Validators.requiredTrue);
    	}
    	if(question.minlength!=undefined) {
    		val.push(Validators.minLength(question.minlength));
    	}
    	if(question.maxlength!=undefined) {
    		val.push(Validators.minLength(question.maxlength));
    	}
    	if(question.patern!=undefined) {
    		val.push(Validators.pattern(question.patern));
    	}
    	//console.log("val of ",question.label," : ",val);
      //group[question.key] = question.required ? new FormControl(question.value || '', Validators.required): new FormControl(question.value || '');
      group[question.key] = question.required ? new FormControl(question.value || '', val): new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
