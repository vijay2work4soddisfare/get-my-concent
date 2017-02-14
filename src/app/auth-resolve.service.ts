import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { DataResolveService } from './data-resolve.service';
@Injectable()
export class AuthResolveService {
  constructor(private af : AngularFire , private data:DataResolveService){
  }
  isLoggedIn: boolean = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(){
    this.af.auth.login().then(result=>{
      this.data.setUserData(result);
    });
  }
  logout(){
    this.af.auth.logout().then(result=>{
      this.data.unSetUserData();
    });
  }
}