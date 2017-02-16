import { QuestionBase } from './base';

export class CheckboxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  type: string;
  gender:string;
  checked:boolean;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.gender= options['gender'];
    this.checked=options['checked'];
  }
}
