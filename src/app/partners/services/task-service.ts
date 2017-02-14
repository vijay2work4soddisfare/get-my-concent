import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { ITask, Task } from '../models/task';
import { DataResolveService } from '../../data-resolve.service';

@Injectable()
export class TaskService {
  visibleTasks$: Observable<ITask[]>;

  private filter$: ReplaySubject<any> = new ReplaySubject(1);
  private filteredTasks$: FirebaseListObservable<ITask[]>;
  private tasks$: FirebaseListObservable<ITask[]>;

  uid;
  constructor(private af: AngularFire,private dataService:DataResolveService) {
    const path = `/accounts/`+dataService.getUserData().uid;

    this.tasks$ = af.database.list(path, {query: {
      orderByChild: 'status',
      equalTo: 'partner'
    }});

    this.filteredTasks$ = af.database.list(path, {query: {
      orderByChild: 'status',
      equalTo: this.filter$
    }});

    this.visibleTasks$ = this.filter$
      .switchMap(filter => filter === null ? this.tasks$ : this.filteredTasks$);
  }


  filterTasks(filter: string): void {
    switch (filter) {
      case 'request':
        this.filter$.next('request');
        break;

      case 'blocked':
        this.filter$.next('blocked');
        break;

      case 'partner':
        this.filter$.next('partner');
        break;

      default:
        this.filter$.next(null);
        break;
    }
  }

  createTask(title: string,mobile:string): firebase.Promise<any> {
    return this.tasks$.push(new Task(title,mobile));
  }

  removeTask(task: ITask): firebase.Promise<any> {
    return this.tasks$.remove(task.$key);
  }

  updateTask(task: ITask, changes: any): firebase.Promise<any> {
    //console.log("changes : ",changes);
    return this.tasks$.update(task.$key, changes);
  }
  selectedUser:ITask;
  setUser(task:ITask){
    this.selectedUser=task;
  }
  unSetUser(){
    this.selectedUser=null;
  }
  getUser():ITask{
    return this.selectedUser;
  }
}
