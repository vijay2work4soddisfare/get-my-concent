import { Component,Input,Output,EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { TaskService } from '../task-service';
import { MdDialog, MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css'],
  providers:[TaskService]
})
export class ShowMapComponent{
  position=[];
  color="warn";
  @Output() onClose =new  EventEmitter<boolean>();
  @Output() addFriend =new  EventEmitter<string>();
  uid;
  gotPosition=false;
  tempPos;
  mySavedLocation:FirebaseObjectObservable<any>;
  otherUsers:FirebaseObjectObservable<any>;
  otherUsersList:FirebaseObjectObservable<any>;
  setposition(latitude,longitude){
    //console.log("inside set position : ",latitude,longitude);
    if(this.position.length==0) {
      //console.log("added new pos.",this.position);
      this.position.push({"coords":{"latitude":latitude,"longitude":longitude}});
      this.gotPosition=true;
    }else if(this.position.length>0){
      //console.log("Removed old pos.",this.position);
      this.gotPosition=false;
      this.position.pop();
      this.setposition(latitude,longitude);
    }
  }
  constructor(public dialogRef: MdDialogRef<ShowMapComponent>,private http:Http , private af:AngularFire,private taskService:TaskService){
    this.af.auth.subscribe(auth=>{
      if(auth!=null && auth!=undefined) {
        this.uid=auth.uid
        if(this.uid!=undefined) {
          ///console.log(this.uid);
          this.mySavedLocation=af.database.object("accounts/"+this.uid+"/", { preserveSnapshot: true });
          this.otherUsers=af.database.object("otherUsers/", { preserveSnapshot: true });
          this.mySavedLocation.subscribe(value=>{
            if(value.exists()) {
              this.setposition(value.val().latitude,value.val().longitude);
            }else{
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position)=>{
                    //console.log(position.coords);
                    this.mySavedLocation.update({"latitude":position.coords.latitude,"longitude":position.coords.longitude,"visible":true});
                    this.otherUsersList=af.database.object("otherUsers/"+this.uid+"/");
                    this.otherUsersList.update({"latitude":position.coords.latitude,"longitude":position.coords.longitude});
                    this.setposition(position.coords.latitude,position.coords.longitude);
                    this.updateFirPos(position.coords.latitude,position.coords.longitude);
                  },(err)=>{
                    var req={considerIp: "false",radioType:"gsm"};
                    //console.log(err);console.log("Navigator error fn");
                      this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDcXnpl_SBh8lQQ1GgxuC0GE1aCfbE7p8I",{},req)
                        .subscribe((response)=>{
                          //console.log("goog map api"); console.log(response);
                          this.tempPos=response;
                          this.position=[];
                          var tres=JSON.parse(this.tempPos._body);
                          //var position=tres.loc.split(",");
                          this.mySavedLocation.update({"latitude":tres.location.lat,"longitude":tres.location.lng,"visible":true});
                          this.otherUsersList=af.database.object("otherUsers/"+this.uid+"/");
                          this.otherUsersList.update({"latitude":tres.location.lat,"longitude":tres.location.lng});
                          this.setposition(tres.location.lat,tres.location.lng);
                          this.updateFirPos(tres.location.lat,tres.location.lng);
                          //console.log("position");
                          //console.log(this.position);
                            this.gotPosition=true;
                      });
                    },
                    { enableHighAccuracy: false, timeout: 3000, maximumAge: 0 }
                  );
                }else{
                  //console.log("location not available");
                }
            }
          });
        }
      }
    });
    var i = 0;
    var ii=setInterval(()=>{
      if(this.color=="primary") { 
        this.color="accent";
      } else if(this.color=="accent") { 
        this.color="warn";
      } else if(this.color=="warn") { 
        this.color="primary";
      }
      if(i==50) {
        clearInterval(ii);
      }
    },600);
  }
  correct=true;
  emtMobileNo(data){
    this.taskService.setUid(this.uid);
    this.taskService.createTask(data.name,data.mobile)
  }
  send($event){
    this.correct=false;
  }
  updatePos(temp){
    this.af.auth.subscribe(auth=>{
      if(auth!=null && auth!=undefined) {
        this.mySavedLocation=this.af.database.object("accounts/"+this.uid+"/");
        this.otherUsersList=this.af.database.object("otherUsers/"+this.uid+"/");
        this.af.auth.subscribe(auth=>{
          this.mySavedLocation.subscribe(data=>{
            console.log(data);
            if(data.visible) {
              this.otherUsersList.update({"latitude":temp.coords.latitude,"longitude":temp.coords.longitude,"pic":auth.auth.photoURL,"name":auth.auth.displayName});
            }else{
              this.otherUsersList.remove();
            }
          });           
         });
        this.mySavedLocation.update({"latitude":temp.coords.latitude,"longitude":temp.coords.longitude});
        this.gotPosition=false;
        this.correct=true;
        this.setposition(temp.coords.latitude,temp.coords.longitude);
      }
    });
  }
  updateFirPos(lat,lng){
    this.af.auth.subscribe(auth=>{
      if(auth!=null && auth!=undefined) {
        this.mySavedLocation=this.af.database.object("accounts/"+this.uid+"/");
        this.otherUsersList=this.af.database.object("otherUsers/"+this.uid+"/");
        this.af.auth.subscribe(auth=>{
            this.otherUsersList.update({"latitude":lat,"longitude":lng,"pic":auth.auth.photoURL,"name":auth.auth.displayName});
           
         });
        this.mySavedLocation.update({"latitude":lat,"longitude":lng});
        this.gotPosition=false;
        this.correct=true;
        this.setposition(lat,lng);
      }
    });
  }
  closeMap(){
    this.onClose.emit(true);
  }
}
