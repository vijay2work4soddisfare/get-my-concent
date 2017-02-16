import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable()
export class DataResolveService {
  constructor(private router:Router,private r:ActivatedRoute,private af : AngularFire){}
  isLoggedIn: boolean = true;
  userData={
    uid:'',
    name:'',
    email:'',
    pic:'',
    gender:'',
    mobile:'',
    accessTocken:'',
    sleepingTime:'',
    latitude:0,
    longitude:0,
    afterSession:'',
    condition:'',
    sessionLocation:''
  };
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  setUserData(data){
    //console.log(data);
    this.userData.uid=data.auth.uid;
    this.userData.accessTocken=data.google.accessToken;
    this.userData.name=data.auth.displayName;
    this.userData.email=data.auth.email;
    this.userData.pic=data.auth.photoURL;
    this.userData.sleepingTime='20:00';
    var user=this.af.database.object("accounts/"+data.uid).first();
    user.subscribe(result=>{
      if(result.$exists()) {
        this.userData.name=(result.name==undefined)?data.auth.displayName:result.name;
        this.userData.email=(result.email==undefined)?data.auth.email:result.email;
        this.userData.mobile=(result.mobile==undefined)?'':result.mobile;
        this.userData.sleepingTime=(result.sleepingTime==undefined)?'20:00':result.sleepingTime;
        this.userData.gender=(result.gender==undefined)?'':result.gender;
        this.userData.condition=(result.condition==undefined)?'':result.condition;
        this.userData.latitude=(result.latitude==undefined)?0:result.latitude;
        this.userData.longitude=(result.longitude==undefined)?0:result.longitude;
        this.userData.afterSession=(result.afterSession==undefined)?'':result.afterSession;
        this.userData.sessionLocation=(result.sessionLocation==undefined)?0:result.sessionLocation;
        //console.log("userData : ",this.userData);
        this.router.navigate(['../','Preference'],{relativeTo:this.r});
      }else{
        //console.log("firstUserData : ",this.userData);
        this.router.navigate(['../','Preference'],{relativeTo:this.r});
      }
    });
  }
  unSetUserData(){
    this.userData={
      uid:'',
      name:'',
      email:'',
      pic:'',
      gender:'',
      mobile:'',
      accessTocken:'',
      sleepingTime:'',
      latitude:0,
      longitude:0,
      condition:'',
      afterSession:'',
      sessionLocation:''
    };
    this.router.navigate(['../','Guest'],{relativeTo:this.r});

  }
  getUserData():any{
    //console.log(this.userData);
    return this.userData;
  }
  updateProfile(data){
    this.af.database.object("accounts/"+this.userData.uid).update(data).then(result=>{
      //console.log(result);
      this.af.database.object("otherUsers/"+this.userData.uid).update({"mobile":data.mobile});
      this.router.navigate(['../','Partners'],{relativeTo:this.r});
    });
  }
}