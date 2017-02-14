import { Injectable }       from '@angular/core';

import { QuestionBase }     from './base';
import { TextboxQuestion }  from './textbox';

@Injectable()
export class QuestionService {

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: '',
        type: 'text',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'mobile',
        label: 'Mobile',
        type: 'tel',
        required: true,
        minlength: 10,
        maxlength: 10,
        patern: /[0-9]/,
        count:10,
        order: 2
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}