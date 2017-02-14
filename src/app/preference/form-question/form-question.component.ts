import { Component, Input ,OnInit} from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from '../base';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid || this.form.controls[this.question.key].untouched; }
  ngOnInit() {
  }

}
