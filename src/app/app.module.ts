import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AuthResolveService } from './auth-resolve.service';
import { DataResolveService } from './data-resolve.service';
import { AuthService }                from './auth.service';
import { AppComponent } from './app.component';

import { AngularFireModule,AuthProviders,AuthMethods } from 'angularfire2';
const firebaseConfig = {
    apiKey: "AIzaSyAr0VHZmbKw_dvH5q0OB8hJElD4QZMp4s0",
    authDomain: "myconsent-f5d0d.firebaseapp.com",
    databaseURL: "https://myconsent-f5d0d.firebaseio.com",
    storageBucket: "myconsent-f5d0d.appspot.com",
    messagingSenderId: "100164233079"
  };

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  scope:['https://www.googleapis.com/auth/calendar']
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  providers: [AuthService,DataResolveService,AuthResolveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
