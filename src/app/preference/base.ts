export class QuestionBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  requiredTrue: boolean;
  order: number;
  minlength: number;
  maxlength: number;
  count: number;
  patern: string;
  controlType: string;
  className:string;
  readonly:boolean;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      requiredTrue?: boolean,
      order?: number,
      minlength?: number,
      maxlength?: number,
      count?: number,
      patern?: string,
      className?: string,
      controlType?: string,
      readonly?:boolean
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.requiredTrue = !!options.requiredTrue;
    this.order = options.order === undefined ? 1 : options.order;
    this.count = options.count;
    this.readonly = options.readonly === undefined ? false : options.readonly;
    this.minlength = options.minlength === undefined ? 1 : options.minlength;
    this.maxlength = options.maxlength === undefined ? 1 : options.maxlength;
    this.patern = options.patern || '';
    this.className = options.className || '';
    this.controlType = options.controlType || '';
  }
}