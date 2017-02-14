/* tslint:disable:no-string-literal */
export interface ITask {
  $key?: string;
  status: string;
  createdAt?: any;
  title: string;
  mobile?: string;
  pic?: string;
}

import * as firebase from 'firebase';

export class Task implements ITask {
  status: string = 'partner';
  //createdAt: number = firebase.database.ServerValue.TIMESTAMP;
  createdAt= firebase.database.ServerValue.TIMESTAMP;
  title: string;
  pic:string="something";
  mobile:string="";
  constructor(title: string,mobile?:string) {
    this.title = title;
    this.mobile=mobile;
    //console.log(this.createdAt);
  }
}
