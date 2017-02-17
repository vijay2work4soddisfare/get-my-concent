import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import {MdSnackBar} from '@angular/material';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { ITask, Task } from '../models/task';
import { DataResolveService } from '../../data-resolve.service';

@Injectable()
export class TaskService {
  visibleTasks$: Observable<ITask[]>;
  private user$;
  private filter$: ReplaySubject<any> = new ReplaySubject(1);
  private filteredTasks$: FirebaseListObservable<ITask[]>;
  private tasks$: FirebaseListObservable<ITask[]>;
  uid;
  path;
  constructor(private af: AngularFire,private dataService:DataResolveService,public snackBar:MdSnackBar) {
    this.path = `/accounts/`+dataService.getUserData().uid;

    this.tasks$ = af.database.list(this.path, {query: {
      orderByChild: 'status',
      equalTo: 'partner'
    }});

    this.filteredTasks$ = af.database.list(this.path, {query: {
      orderByChild: 'status',
      equalTo: this.filter$
    }});

    af.database.object(this.path).subscribe(data=>{
      this.user$=data;
    });
    this.visibleTasks$ = this.filter$
      .switchMap(filter => filter === null ? this.tasks$ : this.filteredTasks$);
  }
  setUid(uid){
    this.path = `/accounts/`+uid;
    this.tasks$ = this.af.database.list(this.path, {query: {
      orderByChild: 'status',
      equalTo: 'partner'
    }});

    this.af.database.object(this.path).subscribe(data=>{
      this.user$=data;
    });

    this.filteredTasks$ = this.af.database.list(this.path, {query: {
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

  createTask(title: string,mobile:string){
    var tasks=this.af.database.list(this.path, {query: {//looking inside partner list
      orderByChild: 'mobile',
      equalTo: mobile
    }});
    tasks.first().subscribe(datalist=>{
      if(datalist.length==0){
        this.openSnackBar(title+" is now a partner","OK");
        this.af.database.list("accounts/", {query: {//looking for registered users
            orderByChild: 'mobile',
            equalTo: mobile
        }}).first().subscribe(registeredUsers=>{
          //console.log("registerd user :",registeredUsers);
          if(registeredUsers.length!=0){
            registeredUsers.map(x=>{
              this.af.database.list("accounts/"+x.$key).push(new Task(this.user$.name,this.user$.mobile));
            });
          }
        });
        return this.tasks$.push(new Task(title,mobile));
      }else{
        this.openSnackBar("Selected user already a partner","OK");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  changeRequest(task:ITask,change:any){
    this.af.database.list("/accounts/",{query:{
      orderByChild:"mobile",
      equalTo:task.mobile
    }}).first().subscribe(registeredUsers=>{
      if(registeredUsers.length!=0) {
        registeredUsers.map(x=>{
          this.af.database.list("/accounts/"+x.$key,{query:{
              orderByChild:"mobile",
              equalTo:this.user$.mobile
            }}).first().subscribe(dataList=>{
              if(dataList.length!=0) {
                dataList.map(y=>{
                  if(y.status!="blocked") {
                  this.af.database.object("/accounts/"+x.$key+"/"+y.$key)
                    .update(change);
                  }
                });
              }
            });
        });
      }
    });
  }
  reportMR(){
    this.af.database.object(this.path).update({"reported":true});
  }
  getReportStatus(){
    return this.user$.reported;
  }
  removeTask(task: ITask){
    this.changeRequest(task,{"status":"partner"});
    return this.tasks$.remove(task.$key);
  }

  updateTask(task: ITask, changes: any){
    if(changes.status!="blocked") {
      this.changeRequest(task,changes);
    }
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
  getCurrentUser():any{
    return this.user$;
  }
}
